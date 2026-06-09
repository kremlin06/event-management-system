import { useState, useEffect, useRef, useCallback } from 'react';
import { getSessionAttendees, updateAttendance } from '../../services/attendance';
import StatusBadge from '../StatusBadge';
import { CheckCircleSVG, SearchSVG } from '../SVGs';
import * as S from '../../styles/Staff/StaffDashboard.styles';

const ATTENDANCE_STATUSES = ['Present', 'Late', 'Absent'];

const ManualOverride = ({ sessionId }) => {
  const [rows,     setRows]     = useState([]);
  const [total,    setTotal]    = useState(0);
  const [q,        setQ]        = useState('');
  const [saving,   setSaving]   = useState(null); // attendanceId being saved
  const [pending,  setPending]  = useState({});   // { userId: status } uncommitted selections
  const searchTimer = useRef(null);

  const load = useCallback((search = q) => {
    if (!sessionId) return;
    getSessionAttendees(sessionId, { q: search || undefined, pageSize: 100 })
      .then(data => {
        setRows(data.rows ?? []);
        setTotal(data.total ?? 0);
      })
      .catch(err => console.error('[ManualOverride] load failed:', err));
  }, [sessionId, q]);

  useEffect(() => {
    setRows([]);
    setTotal(0);
    setPending({});
    setQ('');
    load('');
  }, [sessionId]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearch = (value) => {
    setQ(value);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => load(value), 300);
  };

  const handleStatusChange = (userId, status) => {
    setPending(prev => ({ ...prev, [userId]: status }));
  };

  const handleSave = async (row) => {
    const newStatus = pending[row.userId];
    if (!newStatus || newStatus === row.attendanceStatus) return;

    // If there's no attendance record yet (attendanceId is null), we can't PUT.
    // In that case, show a note — staff should use the QR scan or ask attendee to check in first.
    if (!row.attendanceId) {
      alert('No attendance record found for this attendee in this session. Use the QR scanner to create one first.');
      return;
    }

    setSaving(row.attendanceId);
    try {
      await updateAttendance(row.attendanceId, newStatus);
      // Refresh the list to show updated status
      load();
      setPending(prev => { const n = { ...prev }; delete n[row.userId]; return n; });
    } catch (err) {
      console.error('[ManualOverride] save failed:', err);
    } finally {
      setSaving(null);
    }
  };

  if (!sessionId) {
    return (
      <S.FeedEmpty>Select a session to manage attendance.</S.FeedEmpty>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '0.625rem', position: 'relative' }}>
        <S.SearchInput
          type="search"
          placeholder="Search by name or student ID..."
          value={q}
          onChange={e => handleSearch(e.target.value)}
          aria-label="Search attendees"
        />
      </div>

      <S.AttendeeList aria-label={`Attendee list — ${total} registered`}>
        {!rows.length ? (
          <S.FeedEmpty>
            {q ? 'No attendees match your search.' : 'No attendees registered for this session.'}
          </S.FeedEmpty>
        ) : (
          rows.map(row => {
            const currentStatus = pending[row.userId] ?? row.attendanceStatus;
            const isDirty       = pending[row.userId] && pending[row.userId] !== row.attendanceStatus;
            const isSaving      = saving === row.attendanceId;

            return (
              <S.AttendeeRow key={row.userId} aria-label={`${row.fullName} attendance`}>
                <S.AttendeeInfo>
                  <p className="name">{row.fullName}</p>
                  <p className="id">{row.studentId ?? 'No student ID'}</p>
                </S.AttendeeInfo>

                {row.attendanceStatus && !isDirty ? (
                  <StatusBadge status={row.attendanceStatus} />
                ) : null}

                <S.StatusSelectWrap>
                  <S.StatusSelect
                    value={currentStatus ?? ''}
                    onChange={e => handleStatusChange(row.userId, e.target.value)}
                    disabled={isSaving}
                    aria-label={`Change status for ${row.fullName}`}
                  >
                    <option value="">Not recorded</option>
                    {ATTENDANCE_STATUSES.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </S.StatusSelect>
                </S.StatusSelectWrap>

                <S.SaveBtn
                  onClick={() => handleSave(row)}
                  disabled={!isDirty || isSaving}
                  aria-label={`Save attendance for ${row.fullName}`}
                  title="Save status"
                >
                  {isSaving
                    ? '...'
                    : <CheckCircleSVG size={14} />}
                </S.SaveBtn>
              </S.AttendeeRow>
            );
          })
        )}
      </S.AttendeeList>
    </div>
  );
};

export default ManualOverride;
