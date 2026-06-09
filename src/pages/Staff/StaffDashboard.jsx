// src/pages/Staff/StaffDashboard.jsx
// Staff Dashboard — Blueprint 3 "Two-Pane Master-Detail" live monitoring view.
//
//   Session selector (Event → Session dropdowns)
//   Session stat cards (Checked In / Expected / Attendance Rate) — added Phase 8
//   Left pane  (Session Context): title, venue, schedule, capacity + capacity bar
//   Right pane (Live Feed): auto-updating attendance feed (SSE). Click an entry
//               to inline-edit its status (US-13, handled inside <LiveFeed/>).
//
// on mobile the two panes collapse into a bottom-nav toggle ("Context" / "Live Feed").
// wrapped in <StaffLayout/> so the persistent sidebar + header are shared with every
// other staff page.
//
// old: /staff/dashboard rendered a centered "Welcome back" card (StaffHome).
//      replaced by this monitor view. inline styles also removed in Phase 8.

import { useState } from 'react';
import StaffLayout from '../../components/Staff/StaffLayout';
import LiveFeed from '../../components/Staff/LiveFeed';
import useStaffSession from '../../hooks/useStaffSession';
import { SkeletonLine } from '../../components/Shared/Skeleton';
import {
  CheckCircleSVG,
  InfoSVG,
  LocationSVG,
  ClockSVG,
  UsersSVG,
  ChartBarSVG,
} from '../../components/SVGs';
import * as S from '../../styles/Staff/StaffDashboard.styles';

// mobile bottom-nav tab keys
const TAB_CONTEXT = 'context';
const TAB_FEED    = 'feed';

const StaffDashboard = () => {
  const {
    events, sessions,
    eventId, setEventId,
    sessionId, setSessionId,
    loadingEvents, loadingSessions,
    activeSession, sessionStats,
  } = useStaffSession();

  // mobile: which pane is visible (≤900px)
  const [mobileTab, setMobileTab] = useState(TAB_FEED);

  const totalExpected = sessionStats.total || activeSession?.capacity || 0;
  const pct = totalExpected > 0
    ? Math.round((sessionStats.checkedIn / totalExpected) * 100)
    : 0;

  // session KPI cards — array of objects, each with a label, value, icon, and accent color
  const statCards = [
    {
      label: 'Checked In',
      value: sessionStats.checkedIn,
      icon: <CheckCircleSVG size={20} />,
      color: '#22c55e',
    },
    {
      label: 'Expected',
      value: totalExpected || '—',
      icon: <UsersSVG size={20} />,
      color: '#3b82f6',
    },
    {
      label: 'Attendance Rate',
      value: totalExpected > 0 ? `${pct}%` : '—',
      icon: <ChartBarSVG size={20} />,
      color: '#8b5cf6',
    },
  ];

  return (
    <StaffLayout
      title="Live Monitoring"
      subtitle="Real-time attendance for the selected session"
    >
      <S.LayoutContent>

        {/* session selector — event dropdown first, then session dropdown.
            the session dropdown stays disabled until an event is chosen.
            SelectorSelectWrap gives us the animated chevron arrow. */}
        <S.SelectorBar>
          <label htmlFor="dash-event">Event</label>
          {loadingEvents
            ? <SkeletonLine $h="36px" $w="240px" $mb="0" aria-label="Loading events" />
            : (
              <S.SelectorSelectWrap>
                <S.SelectorSelect
                  id="dash-event"
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

          <label htmlFor="dash-session">Session</label>
          {loadingSessions
            ? <SkeletonLine $h="36px" $w="240px" $mb="0" aria-label="Loading sessions" />
            : (
              <S.SelectorSelectWrap>
                <S.SelectorSelect
                  id="dash-session"
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

        {/* empty state — shown when no session has been chosen yet */}
        {!sessionId ? (
          <S.Card>
            <S.EmptyStatePage>
              <S.EmptyStateIcon aria-hidden="true">
                <InfoSVG size={28} />
              </S.EmptyStateIcon>
              <S.EmptyStateTitle>No session selected</S.EmptyStateTitle>
              <S.EmptyStateSub>
                Choose an event and session from the selectors above to begin
                live monitoring. Attendance will update in real time as
                check-ins are recorded.
              </S.EmptyStateSub>
            </S.EmptyStatePage>
          </S.Card>
        ) : (
          <>
            {/* Present counter bar */}
            {/* old: had inline style={{ borderRadius, marginBottom, border }} — moved to styles */}
            <S.PresentCountBar
              aria-live="polite"
              aria-label="Check-in progress"
            >
              <CheckCircleSVG size={14} aria-hidden="true" />
              <span className="count">{sessionStats.checkedIn}</span>
              <span className="sep">/</span>
              <span className="count">{totalExpected || '—'}</span>
              <span className="label">attendees checked in</span>
            </S.PresentCountBar>

            {/* Session stat mini-cards */}
            <S.SessionStatGrid aria-label="Session key metrics">
              {statCards.map((card) => (
                <S.SessionStatCard key={card.label} $color={card.color}>
                  <S.SessionStatIcon $color={card.color} aria-hidden="true">
                    {card.icon}
                  </S.SessionStatIcon>
                  <S.SessionStatBody>
                    <S.SessionStatValue>{card.value}</S.SessionStatValue>
                    <S.SessionStatLabel>{card.label}</S.SessionStatLabel>
                  </S.SessionStatBody>
                </S.SessionStatCard>
              ))}
            </S.SessionStatGrid>

            {/* Two-pane layout */}
            <S.TwoPaneLayout>

              {/* Left pane: Session Context */}
              <S.Pane $mobileHide={mobileTab !== TAB_CONTEXT}>
                <S.Card>
                  <S.CardHeader>
                    <h2>Session Context</h2>
                    <S.LiveBadge aria-label="Live session">Live</S.LiveBadge>
                  </S.CardHeader>
                  <S.CardBody>
                    <S.SessionMeta>
                      <S.MetaRow>
                        <span>Session</span>
                        <span>{activeSession?.title || '—'}</span>
                      </S.MetaRow>
                      <S.MetaRow>
                        {/* old: SVG was inline with marginRight + verticalAlign styles */}
                        <span>
                          <LocationSVG size={12} aria-hidden="true" />
                          {' '}Venue
                        </span>
                        <span>{activeSession?.venue || 'Not specified'}</span>
                      </S.MetaRow>
                      {activeSession?.schedule && (
                        <S.MetaRow>
                          <span>
                            <ClockSVG size={12} aria-hidden="true" />
                            {' '}Start Time
                          </span>
                          <span>
                            {new Date(activeSession.schedule).toLocaleString('en-PH', {
                              dateStyle: 'medium', timeStyle: 'short',
                            })}
                          </span>
                        </S.MetaRow>
                      )}
                      <S.MetaRow>
                        <span>
                          <UsersSVG size={12} aria-hidden="true" />
                          {' '}Capacity
                        </span>
                        <span>{activeSession?.capacity || '—'}</span>
                      </S.MetaRow>
                      <S.MetaRow>
                        <span>Checked In</span>
                        <span>
                          <S.StatusBadge $status="Present">
                            {sessionStats.checkedIn} present
                          </S.StatusBadge>
                        </span>
                      </S.MetaRow>
                    </S.SessionMeta>

                    {/* capacity utilisation progress bar */}
                    {totalExpected > 0 && (
                      <S.CapacityBarWrap aria-label={`${pct}% capacity used`}>
                        <S.CapacityBarLabel>
                          <span>Capacity usage</span>
                          <span>{pct}%</span>
                        </S.CapacityBarLabel>
                        <S.CapacityBarTrack>
                          <S.CapacityBarFill $pct={pct} />
                        </S.CapacityBarTrack>
                      </S.CapacityBarWrap>
                    )}
                  </S.CardBody>
                </S.Card>
              </S.Pane>

              {/* Right pane: Live Feed */}
              <S.Pane $mobileHide={mobileTab !== TAB_FEED}>
                <S.Card>
                  <S.CardHeader>
                    <h2>Live Feed</h2>
                    {/* old: fontSize/color were inline styles */}
                    <S.NotifTime>Click an entry to correct status</S.NotifTime>
                  </S.CardHeader>
                  <LiveFeed
                    sessionId={sessionId ? Number(sessionId) : null}
                    externalEntries={[]}
                  />
                </S.Card>
              </S.Pane>

            </S.TwoPaneLayout>
          </>
        )}

      </S.LayoutContent>

      {/* Mobile bottom navigation (≤900px) */}
      {sessionId && (
        <S.BottomNav aria-label="Dashboard pane navigation">
          <S.BottomNavBtn
            $active={mobileTab === TAB_CONTEXT}
            onClick={() => setMobileTab(TAB_CONTEXT)}
            aria-pressed={mobileTab === TAB_CONTEXT}
            aria-label="Session context"
          >
            <InfoSVG size={20} aria-hidden="true" />
            Context
          </S.BottomNavBtn>
          <S.BottomNavBtn
            $active={mobileTab === TAB_FEED}
            onClick={() => setMobileTab(TAB_FEED)}
            aria-pressed={mobileTab === TAB_FEED}
            aria-label="Live feed"
          >
            <UsersSVG size={20} aria-hidden="true" />
            Live Feed
          </S.BottomNavBtn>
        </S.BottomNav>
      )}
    </StaffLayout>
  );
};

export default StaffDashboard;
