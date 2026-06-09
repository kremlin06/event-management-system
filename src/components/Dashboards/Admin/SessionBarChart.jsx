// src/components/Dashboards/Admin/SessionBarChart.jsx
// WCAG 2.1 AA: role="img" + aria-label + visually-hidden data table as accessible fallback
// FIXED: tooltip moved to BarGroup level (outside BarTrack) so overflow:hidden on BarTrack
//        no longer clips it — tooltip now correctly appears above the bar
import styled, { keyframes, css } from 'styled-components';

const growUp = keyframes`
  from { transform: scaleY(0); }
  to   { transform: scaleY(1); }
`;

// chart grid — extra padding-top gives the tooltip room to appear above bars
const ChartGrid = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  height: 210px;
  padding-top: 36px;
  box-sizing: border-box;
`;

// position: relative so the Tooltip can be positioned absolute relative to this
const BarGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  flex: 1;
  min-width: 52px;
  cursor: default;
  position: relative;
`;

// tooltip is now a separate element OUTSIDE BarTrack so overflow:hidden on BarTrack
// does NOT clip it — this was the root cause of the "tooltip cut off inside bar" bug
const Tooltip = styled.div`
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.colors.bgSecondary};
  color: ${({ theme }) => theme.colors.textPrimary};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: 4px;
  padding: 4px 10px;
  font-size: 0.7rem;
  font-weight: 700;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.15s ease;
  z-index: 20;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  ${BarGroup}:hover &,
  ${BarGroup}:focus-within & {
    opacity: 1;
  }
`;

const BarTrack = styled.div`
  width: 100%;
  max-width: 48px;
  height: 140px;
  background: ${({ theme }) => theme.colors.bgTertiary};
  border-radius: 6px 6px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  position: relative;
`;

// OLD: BarFill had ::after tooltip that was clipped by BarTrack overflow:hidden
// that caused the "3% capaci..." truncated tooltip bug
// MODIFIED: ::after removed — tooltip is now a sibling element outside BarTrack
const BarFill = styled.div`
  width: 100%;
  height: ${({ $pct }) => $pct}%;
  background: ${({ $pct }) =>
    $pct >= 85
      ? '#22c55e'
      : $pct >= 50
      ? '#3b82f6'
      : '#f59e0b'};
  border-radius: 4px 4px 0 0;
  transform-origin: bottom;
  animation: ${growUp} 0.5s ease forwards;
`;

const BarValue = styled.span`
  font-size: 0.7rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const BarLabel = styled.span`
  font-size: 0.68rem;
  color: ${({ theme }) => theme.colors.textTertiary};
  text-align: center;
  line-height: 1.2;
  max-width: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SrOnly = styled.caption`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

const LegendRow = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.72rem;
  color: ${({ theme }) => theme.colors.textTertiary};
`;

const LegendDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  flex-shrink: 0;
`;

const EmptyChart = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 180px;
  color: ${({ theme }) => theme.colors.textTertiary};
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
`;

const SkeletonBar = styled.div`
  height: 140px;
  flex: 1;
  min-width: 52px;
  background: ${({ theme }) => theme.colors.bgTertiary};
  border-radius: 6px 6px 0 0;
  animation: pulse 1.5s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
`;

const SessionBarChart = ({ data = [], loading = false }) => {
  if (loading) {
    return (
      <ChartGrid role="status" aria-label="Loading chart data">
        {[1, 2, 3, 4, 5].map((i) => (
          <SkeletonBar key={i} />
        ))}
      </ChartGrid>
    );
  }

  if (!data || data.length === 0) {
    return (
      <EmptyChart role="status">No session attendance data available</EmptyChart>
    );
  }

  const maxAttended = Math.max(...data.map((s) => s.attended), 1);

  return (
    <div>
      <ChartGrid
        role="img"
        aria-labelledby="session-chart-title"
        aria-describedby="session-chart-table"
      >
        {data.map((session) => {
          const pct = Math.round((session.attended / maxAttended) * 100);
          const capacityPct = Math.round((session.attended / session.capacity) * 100);
          const shortName =
            session.sessionName.length > 10
              ? session.sessionName.slice(0, 9) + '…'
              : session.sessionName;

          return (
            <BarGroup
              key={session.sessionId}
              tabIndex={0}
              aria-label={`${session.sessionName}: ${session.attended} of ${session.capacity} attended (${capacityPct}%)`}
            >
              {/* tooltip is OUTSIDE BarTrack — no longer clipped by overflow:hidden */}
              <Tooltip aria-hidden="true">{capacityPct}% capacity</Tooltip>

              <BarValue aria-hidden="true">{session.attended}</BarValue>

              <BarTrack aria-hidden="true">
                <BarFill $pct={pct} />
              </BarTrack>

              <BarLabel aria-hidden="true" title={session.sessionName}>
                {shortName}
              </BarLabel>
            </BarGroup>
          );
        })}
      </ChartGrid>

      <LegendRow aria-hidden="true">
        <LegendItem><LegendDot $color="#22c55e" />High (&ge;85% capacity)</LegendItem>
        <LegendItem><LegendDot $color="#3b82f6" />Normal (50–84%)</LegendItem>
        <LegendItem><LegendDot $color="#f59e0b" />Low (&lt;50%)</LegendItem>
      </LegendRow>

      {/* WCAG 2.1 AA: visually-hidden data table as accessible fallback */}
      <table
        id="session-chart-table"
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0,0,0,0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      >
        <SrOnly>Session attendance data table</SrOnly>
        <thead>
          <tr>
            <th scope="col">Session</th>
            <th scope="col">Event</th>
            <th scope="col">Attended</th>
            <th scope="col">Capacity</th>
            <th scope="col">Fill Rate</th>
          </tr>
        </thead>
        <tbody>
          {data.map((session) => (
            <tr key={session.sessionId}>
              <td>{session.sessionName}</td>
              <td>{session.eventName}</td>
              <td>{session.attended}</td>
              <td>{session.capacity}</td>
              <td>{Math.round((session.attended / session.capacity) * 100)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SessionBarChart;
