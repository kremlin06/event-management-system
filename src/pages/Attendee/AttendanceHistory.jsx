// src/pages/Attendee/AttendanceHistory.jsx
// Attendance History — full log of the attendee's event participation.
// Maps to US-16. Reads from D4 (Attendance Logs) via AttendeeID.
// Desktop: data table. Mobile: expandable card stack (no horizontal scroll).
import { useState, useEffect } from 'react';
import PortalPageLayout from '../../components/Attendee/PortalPageLayout';
// old: imported getMockAttendanceHistory (fake "Opening Keynote" row).
// Phase 5: removed — page now shows real D4 Attendance rows or empty state.
import { getAttendanceHistory } from '../../services/attendee';
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  EmptyState,
  EmptyTitle,
  EmptySubtitle,
  Skeleton,
  StatusBadge,
} from '../../styles/Dashboards/Attendee/AttendeePage.styles';
import {
  Table,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
  TdSecondary,
  CardStack,
  HistoryCard,
  HistoryCardRow,
  HistoryCardLabel,
  HistoryCardValue,
  SummaryStrip,
  SummaryChip,
} from '../../styles/Dashboards/Attendee/AttendanceHistory.styles';
import {
  CheckCircleSVG,
  ClockSVG,
  XCircleSVG,
  CalendarSVG,
} from '../../components/SVGs';

const STATUS_ICON = {
  Present: <CheckCircleSVG size={14} />,
  Late: <ClockSVG size={14} />,
  Absent: <XCircleSVG size={14} />,
};

const STATUS_COLOR = {
  Present: '#22c55e',
  Late: '#f59e0b',
  Absent: '#ef4444',
};

// old: no null guard — new Date(undefined/null) → "Invalid Date" in the UI.
const formatDate = (iso) => {
  if (!iso) return '—';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const AttendanceHistory = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        // Phase 5: real API only — empty state on error, never mock.
        const data = await getAttendanceHistory();
        setRecords(Array.isArray(data) ? data : []);
      } catch (err) {
        console.warn('[AttendanceHistory] fetch failed:', err?.response?.status ?? err?.message);
        setRecords([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const counts = records.reduce(
    (acc, r) => ({ ...acc, [r.status]: (acc[r.status] || 0) + 1 }),
    {}
  );

  const renderSkeleton = () => (
    <Card>
      <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Skeleton $h="14px" $w="35%" />
            <Skeleton $h="14px" $w="25%" />
            <Skeleton $h="14px" $w="20%" />
            <Skeleton $h="22px" $w="12%" style={{ borderRadius: '999px' }} />
          </div>
        ))}
      </CardBody>
    </Card>
  );

  if (loading) {
    return (
      <PortalPageLayout title="Attendance History" subtitle="Loading your records...">
        {renderSkeleton()}
      </PortalPageLayout>
    );
  }

  const totalSessions = records.length;

  return (
    <PortalPageLayout
      title="Attendance History"
      subtitle={`${totalSessions} session${totalSessions !== 1 ? 's' : ''} recorded`}
    >
      {/* Summary chips */}
      {records.length > 0 && (
        <SummaryStrip>
          {Object.entries(counts).map(([status, count]) => (
            <SummaryChip key={status} $color={STATUS_COLOR[status]}>
              {STATUS_ICON[status]}
              {count} {status}
            </SummaryChip>
          ))}
        </SummaryStrip>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Session Log</CardTitle>
        </CardHeader>

        {records.length === 0 ? (
          <CardBody>
            <EmptyState>
              <CalendarSVG size={36} />
              <EmptyTitle>No attendance records yet</EmptyTitle>
              <EmptySubtitle>
                Your attendance will be logged here automatically after staff scans your QR code.
              </EmptySubtitle>
            </EmptyState>
          </CardBody>
        ) : (
          <>
            {/* Desktop table */}
            <Table>
              <Thead>
                <tr>
                  <Th>Event</Th>
                  <Th>Session</Th>
                  <Th>Date</Th>
                  <Th>Status</Th>
                </tr>
              </Thead>
              <Tbody>
                {records.map((r) => (
                  // old: r.logId     → backend sends `id`
                  // old: r.eventName → backend sends `eventTitle`
                  // old: r.sessionDate → backend sends `checkInTime`
                  <Tr key={r.id}>
                    <Td>{r.eventTitle}</Td>
                    <TdSecondary>{r.sessionTitle}</TdSecondary>
                    <TdSecondary>{formatDate(r.checkInTime)}</TdSecondary>
                    <Td>
                      <StatusBadge $status={r.status}>
                        {STATUS_ICON[r.status]}
                        {r.status}
                      </StatusBadge>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>

            {/* Mobile card stack — no horizontal scroll */}
            <CardStack style={{ padding: '1rem' }}>
              {records.map((r) => (
                // old: r.logId/r.eventName/r.sessionDate — see table comment above
                <HistoryCard key={r.id}>
                  <HistoryCardRow>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: 4 }}>
                        {r.eventTitle}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        {r.sessionTitle}
                      </div>
                    </div>
                    <StatusBadge $status={r.status}>
                      {STATUS_ICON[r.status]}
                      {r.status}
                    </StatusBadge>
                  </HistoryCardRow>
                  <HistoryCardRow>
                    <HistoryCardLabel>Date</HistoryCardLabel>
                    <HistoryCardValue>{formatDate(r.checkInTime)}</HistoryCardValue>
                  </HistoryCardRow>
                </HistoryCard>
              ))}
            </CardStack>
          </>
        )}
      </Card>
    </PortalPageLayout>
  );
};

export default AttendanceHistory;
