// src/pages/Staff/StaffAttendanceHistory.jsx
// Staff Attendance History — read-only attendance log for a chosen session.
//
// pick an Event then a Session (same dropdown pattern as the dashboard/scanner)
// and the full roster for that session loads into a table: name, student id,
// check-in time and a Present / Late / Absent status badge.  data comes from
// getSessionAttendees() → GET /api/attendance/session/:id which returns
// { total, page, pageSize, rows } with rows of { fullName, studentId,
// checkInTime, status }.  wrapped in <StaffLayout/> for the shared shell.

import { useState, useEffect } from 'react';
import StaffLayout from '../../components/Staff/StaffLayout';
import useStaffSession from '../../hooks/useStaffSession';
import { getSessionAttendees } from '../../services/attendance';
import { SkeletonLine } from '../../components/Shared/Skeleton';
import { TableSVG, SearchSVG } from '../../components/SVGs';
import * as S from '../../styles/Staff/StaffDashboard.styles';

const StaffAttendanceHistory = () => {
  const {
    events, sessions,
    eventId, setEventId,
    sessionId, setSessionId,
    loadingEvents, loadingSessions,
    activeSession,
  } = useStaffSession();

  const [rows,    setRows]    = useState([]);
  const [total,   setTotal]   = useState(0);
  const [loading, setLoading] = useState(false);
  const [query,   setQuery]   = useState('');

  // load the roster whenever the chosen session changes
  useEffect(() => {
    setRows([]);
    setTotal(0);
    setQuery('');
    if (!sessionId) return;

    let active = true;
    setLoading(true);
    getSessionAttendees(sessionId, { pageSize: 1000 })
      .then((d) => {
        if (!active) return;
        setRows(Array.isArray(d.rows) ? d.rows : []);
        setTotal(d.total ?? (d.rows?.length || 0));
      })
      .catch((err) => {
        console.warn('[StaffAttendanceHistory] roster fetch failed:', err?.response?.status ?? err?.message);
        if (active) setRows([]);
      })
      .finally(() => { if (active) setLoading(false); });

    return () => { active = false; };
  }, [sessionId]);

  // client-side filter by name or student id
  const q = query.trim().toLowerCase();
  const visibleRows = q
    ? rows.filter((r) =>
        (r.fullName || '').toLowerCase().includes(q) ||
        String(r.studentId || '').toLowerCase().includes(q))
    : rows;

  const fmtTime = (t) => {
    if (!t) return '—';
    const d = new Date(t);
    if (isNaN(d.getTime())) return '—';
    return d.toLocaleString('en-PH', { dateStyle: 'medium', timeStyle: 'short' });
  };

  return (
    <StaffLayout
      title="Attendance History"
      subtitle={
        sessionId
          ? `${total} record${total !== 1 ? 's' : ''}${activeSession?.title ? ` · ${activeSession.title}` : ''}`
          : 'Select a session to view its attendance log'
      }
    >
      <S.LayoutContent>
        {/* Session selector */}
        <S.SelectorBar>
          <label htmlFor="hist-event">Event</label>
          {loadingEvents
            ? <SkeletonLine $h="36px" $w="240px" $mb="0" aria-label="Loading events" />
            : (
              <S.SelectorSelectWrap>
                <S.SelectorSelect
                  id="hist-event"
                  value={eventId}
                  onChange={(e) => setEventId(e.target.value)}
                >
                  <option value="">Select an event...</option>
                  {events.map((ev) => (
                    <option key={ev.id} value={ev.id}>{ev.title}</option>
                  ))}
                </S.SelectorSelect>
              </S.SelectorSelectWrap>
            )
          }

          <label htmlFor="hist-session">Session</label>
          {loadingSessions
            ? <SkeletonLine $h="36px" $w="240px" $mb="0" aria-label="Loading sessions" />
            : (
              <S.SelectorSelectWrap>
                <S.SelectorSelect
                  id="hist-session"
                  value={sessionId}
                  onChange={(e) => setSessionId(e.target.value)}
                  disabled={!eventId}
                >
                  <option value="">Select a session...</option>
                  {sessions.map((s) => (
                    <option key={s.id} value={s.id}>{s.title}</option>
                  ))}
                </S.SelectorSelect>
              </S.SelectorSelectWrap>
            )
          }
        </S.SelectorBar>

        {/* Roster table */}
        <S.Card>
          <S.CardHeader>
            <h2>
              <TableSVG size={15} style={{ marginRight: 6, verticalAlign: 'middle' }} />
              Attendance Log
            </h2>
            {/* old: inline position:relative div + absolute-positioned icon + inline paddingLeft/width.
                now uses SearchWrap + SearchInputPadded from the styles file. */}
            {sessionId && rows.length > 0 && (
              <S.SearchWrap>
                <SearchSVG size={14} aria-hidden="true" />
                <S.SearchInputPadded
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search name or ID..."
                  aria-label="Search attendance log"
                />
              </S.SearchWrap>
            )}
          </S.CardHeader>

          {!sessionId ? (
            /* old: FeedEmpty with inline padding/opacity/marginBottom styles */
            <S.EmptyStatePage>
              <S.EmptyStateIcon aria-hidden="true">
                <TableSVG size={28} />
              </S.EmptyStateIcon>
              <S.EmptyStateTitle>No session selected</S.EmptyStateTitle>
              <S.EmptyStateSub>
                Choose an event and session above to load its attendance log.
              </S.EmptyStateSub>
            </S.EmptyStatePage>
          ) : loading ? (
            <S.CardBody style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[1, 2, 3, 4, 5].map((i) => <SkeletonLine key={i} $h="20px" $mb="0" />)}
            </S.CardBody>
          ) : visibleRows.length === 0 ? (
            <S.EmptyStatePage>
              <S.EmptyStateIcon aria-hidden="true">
                <TableSVG size={28} />
              </S.EmptyStateIcon>
              <S.EmptyStateSub>
                {rows.length === 0
                  ? 'No attendance records for this session yet.'
                  : 'No matches for your search.'}
              </S.EmptyStateSub>
            </S.EmptyStatePage>
          ) : (
            <S.HistoryTableWrap>
              <S.HistoryTable>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Student ID</th>
                    <th>Check-in Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleRows.map((r, idx) => (
                    <tr key={r.attendanceId ?? r.userId ?? `${r.studentId}-${idx}`}>
                      <td>{r.fullName || '—'}</td>
                      <td>{r.studentId || '—'}</td>
                      <td>{fmtTime(r.checkInTime)}</td>
                      <td>
                        <S.StatusBadge $status={r.status}>
                          {r.status || 'Unknown'}
                        </S.StatusBadge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </S.HistoryTable>
            </S.HistoryTableWrap>
          )}
        </S.Card>
      </S.LayoutContent>
    </StaffLayout>
  );
};

export default StaffAttendanceHistory;
