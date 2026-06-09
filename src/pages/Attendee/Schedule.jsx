// src/pages/Attendee/Schedule.jsx
// My Schedule — vertical timeline of all sessions the attendee is registered for.
// Maps to US-15. Queries D3 (Registration) joined with D2 (Session).
import { useState, useEffect } from 'react';
import PortalPageLayout from '../../components/Attendee/PortalPageLayout';
// old: imported getMockSchedule as a fallback when the API was unavailable.
// Phase 5: that mock has been removed — page falls through to empty state.
import { getAttendeeSchedule } from '../../services/attendee';
import {
  Card,
  CardBody,
  EmptyState,
  EmptyTitle,
  EmptySubtitle,
  Skeleton,
  InfoBanner,
} from '../../styles/Dashboards/Attendee/AttendeePage.styles';
import {
  Timeline,
  TimelineLine,
  TimelineItem,
  TimelineDot,
  TimelineCard,
  ActiveLabel,
  SessionTitle,
  EventName,
  SessionMeta,
  MetaItem,
} from '../../styles/Dashboards/Attendee/Schedule.styles';
import {
  CalendarSVG,
  LocationSVG,
  ClockSVG,
  CheckCircleSVG,
  InfoSVG,
} from '../../components/SVGs';

// Determine timeline state from the session's start time
// old: received startTime — backend field is `schedule`, not `startTime`.
//      new Date(undefined) → NaN, causing the diff calculation to produce
//      NaN and the function to always fall through to 'upcoming'.
// new: guard against null/undefined before constructing the Date object.
const getSessionState = (schedule) => {
  if (!schedule) return 'upcoming';           // no schedule → treat as upcoming
  const now   = Date.now();
  const start = new Date(schedule).getTime();
  if (isNaN(start)) return 'upcoming';        // malformed string guard

  const diff = start - now;
  if (diff < 0) return 'past';                  // session already started/ended
  if (diff <= 60 * 60 * 1000) return 'active'; // starting within the next hour
  return 'upcoming';
};

// old: crashed on null because new Date(null) → Jan 1 1970, not "no date".
// new: return a placeholder string so the UI never renders "Invalid Date".
const formatSessionTime = (isoString) => {
  if (!isoString) return { date: 'Date TBD', time: 'TBD' };
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return { date: 'Date TBD', time: 'TBD' };
  return {
    date: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
    time: d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
  };
};

const DotIcon = ({ state }) => {
  if (state === 'active')   return <CalendarSVG size={18} />;
  if (state === 'past')     return <CheckCircleSVG size={18} />;
  return <ClockSVG size={18} />;
};

const Schedule = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        // Phase 5: real API only.  On error, show empty state — never mock.
        const data = await getAttendeeSchedule();
        setSessions(Array.isArray(data) ? data : []);
      } catch (err) {
        console.warn('[Schedule] fetch failed:', err?.response?.status ?? err?.message);
        setSessions([]);
        setError('Could not load your schedule. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchSchedule();
  }, []);

  // Augment sessions with a computed state field.
  // old: s.startTime — backend returns `schedule`, not `startTime`.
  const annotated = sessions.map((s) => ({ ...s, state: getSessionState(s.schedule) }));

  const nextActiveIndex = annotated.findIndex((s) => s.state !== 'past');

  const renderContent = () => {
    if (loading) {
      return (
        <Card>
          <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem' }}>
                <Skeleton $h="40px" $w="40px" style={{ borderRadius: '50%', flexShrink: 0 }} />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <Skeleton $h="18px" $w="60%" />
                  <Skeleton $h="14px" $w="40%" />
                  <Skeleton $h="12px" $w="80%" />
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      );
    }

    if (error) {
      return (
        <InfoBanner>
          <InfoSVG size={18} />
          {error}
        </InfoBanner>
      );
    }

    if (annotated.length === 0) {
      return (
        <Card>
          <CardBody>
            <EmptyState>
              <CalendarSVG size={36} />
              <EmptyTitle>No sessions scheduled yet</EmptyTitle>
              <EmptySubtitle>
                Register for campus events to see them appear in your personal timeline.
              </EmptySubtitle>
            </EmptyState>
          </CardBody>
        </Card>
      );
    }

    return (
      <Timeline>
        <TimelineLine />
        {annotated.map((session, idx) => {
          // old: session.startTime — backend returns `schedule`
          const { date, time } = formatSessionTime(session.schedule);
          const isNextActive = idx === nextActiveIndex && session.state !== 'past';
          const displayState = isNextActive ? 'active' : session.state;

          return (
            <TimelineItem key={session.sessionId} $state={displayState}>
              <TimelineDot $state={displayState}>
                <DotIcon state={displayState} />
              </TimelineDot>

              <TimelineCard $state={displayState}>
                {isNextActive && (
                  <ActiveLabel>
                    <CalendarSVG size={11} />
                    Up next
                  </ActiveLabel>
                )}

                <SessionTitle>{session.title}</SessionTitle>
                {/* old: session.eventName — backend field is `eventTitle` */}
                <EventName>{session.eventTitle}</EventName>

                <SessionMeta>
                  <MetaItem>
                    <CalendarSVG size={13} />
                    {date}
                  </MetaItem>
                  <MetaItem>
                    <ClockSVG size={13} />
                    {time}
                  </MetaItem>
                  <MetaItem>
                    <LocationSVG size={13} />
                    {session.venue || 'Venue TBD'}
                  </MetaItem>
                </SessionMeta>
              </TimelineCard>
            </TimelineItem>
          );
        })}
      </Timeline>
    );
  };

  const upcoming = annotated.filter((s) => s.state !== 'past').length;

  return (
    <PortalPageLayout
      title="My Schedule"
      subtitle={loading ? 'Loading your sessions...' : `${upcoming} upcoming session${upcoming !== 1 ? 's' : ''}`}
    >
      {renderContent()}
    </PortalPageLayout>
  );
};

export default Schedule;
