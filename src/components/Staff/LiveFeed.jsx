import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../../contexts/useAuth';
import { updateAttendance } from '../../services/attendance';
import StatusBadge from '../StatusBadge';
import { WifiOffSVG, CheckCircleSVG, XCircleSVG } from '../SVGs';
import * as S from '../../styles/Staff/StaffDashboard.styles';

const MAX_ENTRIES = 50;
const SSE_BASE_PATH = '/api/attendance/session';
const STATUSES = ['Present', 'Late', 'Absent'];

// mask studentId for non-admin roles (same pii rule as analytics)
const maskStudentId = (id, role) => {
  if (!id) return 'N/A';
  if (role === 'Admin' || role === 'Organizer') return id;
  return '*-' + String(id).slice(-4);
};

// LiveFeed
//
// props:
//   sessionId       number | null
//   externalEntries array — fresh scan results pushed by QRScanner in the same view
//
// new in Phase 6 (US-13):
//   clicking any feed entry opens an inline status dropdown + save/cancel row.
//   the save calls PUT /api/attendance/:id; the sse broadcast from the server
//   then confirms the change by emitting a type:'update' event.
const LiveFeed = ({ sessionId, externalEntries = [] }) => {
  const { user } = useAuth();
  const [entries,      setEntries]      = useState([]);
  const [disconnected, setDisconnected] = useState(false);
  // editing: { attendanceId, status } | null
  const [editing,  setEditing]  = useState(null);
  const [saving,   setSaving]   = useState(false);
  const esRef = useRef(null);

  // merge externally-pushed entries (scan result already visible in QRScanner overlay)
  useEffect(() => {
    if (!externalEntries.length) return;
    setEntries(prev => [...externalEntries, ...prev].slice(0, MAX_ENTRIES));
  }, [externalEntries]);

  useEffect(() => {
    if (!sessionId) return;

    setEntries([]);
    setDisconnected(false);
    setEditing(null);

    const token = localStorage.getItem('authToken');
    // eventSource doesn't support custom headers — pass token as query param.
    // the verifyToken middleware reads ?token= as a fallback for sse connections.
    const url = `${SSE_BASE_PATH}/${sessionId}/stream?token=${token}`;
    const es  = new EventSource(url);
    esRef.current = es;

    es.onmessage = (e) => {
      try {
        const payload = JSON.parse(e.data);
        if (payload.type === 'ping' || payload.type === 'connected') return;
        setDisconnected(false);

        if (payload.type === 'update') {
          // old: all events were prepended as new rows — updates appeared as
          //      duplicate entries with different statuses.
          // new: find the existing entry by attendanceId and patch its status
          //      in-place so the row simply reflects the new status.
          setEntries(prev =>
            prev.map(entry =>
              entry.attendanceId === payload.attendanceId
                ? { ...entry, status: payload.status, checkInTime: payload.checkInTime }
                : entry
            )
          );
        } else {
          // type:'scan' — new check-in, prepend to list
          setEntries(prev => [payload, ...prev].slice(0, MAX_ENTRIES));
        }
      } catch { /* malformed frame — ignore */ }
    };

    es.onerror = () => {
      setDisconnected(true);
      console.warn('[LiveFeed] SSE disconnected, attempting reconnect...');
    };

    return () => {
      es.close();
      esRef.current = null;
    };
  }, [sessionId]);

  // US-13: save an inline status edit
  const handleEditSave = useCallback(async () => {
    if (!editing) return;
    const { attendanceId, status } = editing;
    setSaving(true);
    try {
      await updateAttendance(attendanceId, status);
      // optimistic update — sse broadcast will also arrive and confirm
      setEntries(prev =>
        prev.map(e => e.attendanceId === attendanceId ? { ...e, status } : e)
      );
      setEditing(null);
    } catch (err) {
      console.error('[LiveFeed] edit save failed:', err);
    } finally {
      setSaving(false);
    }
  }, [editing]);

  const handleEditCancel = useCallback(() => setEditing(null), []);

  return (
    <div>
      {disconnected && (
        <S.ReconnectBanner role="status" aria-live="polite">
          <WifiOffSVG size={13} />
          Reconnecting to live feed...
        </S.ReconnectBanner>
      )}

      <S.FeedContainer aria-label="Live scan feed" aria-live="polite" aria-atomic="false">
        {!entries.length ? (
          <S.FeedEmpty>
            {sessionId ? 'Waiting for scans...' : 'Select a session to start the live feed.'}
          </S.FeedEmpty>
        ) : (
          entries.map((entry, i) => {
            const entryKey   = `${entry.attendanceId ?? i}-${entry.checkInTime}`;
            const isEditing  = editing?.attendanceId === entry.attendanceId;
            const canEdit    = Boolean(entry.attendanceId); // no id = unconfirmed external entry

            return (
              <div key={entryKey}>
                <S.FeedEntry
                  onClick={() => {
                    if (!canEdit) return;
                    // toggle: clicking the same row again closes the edit row
                    setEditing(isEditing
                      ? null
                      : { attendanceId: entry.attendanceId, status: entry.status }
                    );
                  }}
                  style={{ cursor: canEdit ? 'pointer' : 'default' }}
                  title={canEdit ? 'Click to correct attendance status' : undefined}
                  role={canEdit ? 'button' : undefined}
                  tabIndex={canEdit ? 0 : undefined}
                  onKeyDown={(e) => {
                    if (canEdit && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      setEditing(isEditing
                        ? null
                        : { attendanceId: entry.attendanceId, status: entry.status }
                      );
                    }
                  }}
                  aria-expanded={canEdit ? isEditing : undefined}
                >
                  <div style={{ flexShrink: 0 }}>
                    <StatusBadge status={entry.status} />
                  </div>
                  <S.FeedEntryInfo>
                    <p className="name">{entry.fullName ?? 'Unknown'}</p>
                    <p className="meta">{maskStudentId(entry.studentId, user?.role)}</p>
                  </S.FeedEntryInfo>
                  <S.FeedTime>
                    {entry.checkInTime
                      ? new Date(entry.checkInTime).toLocaleTimeString('en-PH', {
                          hour: '2-digit', minute: '2-digit',
                        })
                      : '—'}
                  </S.FeedTime>
                </S.FeedEntry>

                {/* US-13 inline edit row — shown when this entry is selected */}
                {isEditing && (
                  <S.FeedEntryEditRow aria-label={`Edit attendance status for ${entry.fullName}`}>
                    <S.StatusSelectWrap>
                      <S.StatusSelect
                        value={editing.status}
                        onChange={e => setEditing(prev => ({ ...prev, status: e.target.value }))}
                        disabled={saving}
                        aria-label="New attendance status"
                      >
                        {STATUSES.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </S.StatusSelect>
                    </S.StatusSelectWrap>

                    <S.EditActionBtn
                      onClick={handleEditSave}
                      disabled={saving || editing.status === entry.status}
                      aria-label="Save status change"
                    >
                      {saving ? '...' : <CheckCircleSVG size={13} />}
                      {saving ? 'Saving' : 'Save'}
                    </S.EditActionBtn>

                    <S.EditActionBtn
                      $variant="cancel"
                      onClick={handleEditCancel}
                      disabled={saving}
                      aria-label="Cancel edit"
                    >
                      <XCircleSVG size={13} />
                      Cancel
                    </S.EditActionBtn>
                  </S.FeedEntryEditRow>
                )}
              </div>
            );
          })
        )}
      </S.FeedContainer>
    </div>
  );
};

export default LiveFeed;
