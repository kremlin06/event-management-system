// src/pages/Attendee/BrowseEvents.jsx
// Browse & Register — card grid of "Open" campus events.
// Maps to US-14. Inserts into Registration (D3) and triggers FR-08 notification.
import { useState, useEffect, useCallback } from 'react';
import PortalPageLayout from '../../components/Attendee/PortalPageLayout';
// old: imported getMockOpenEvents (Campus Tech Summit / IT Club Assembly fakes).
// Phase 5: removed — page now shows real DB events or its empty state.
import { getOpenEvents, registerForEvent } from '../../services/attendee';
import {
  EmptyState,
  EmptyTitle,
  EmptySubtitle,
  Skeleton,
  ActionBtn,
  InfoBanner,
} from '../../styles/Dashboards/Attendee/AttendeePage.styles';
import {
  EventGrid,
  EventCard,
  CardAccentBar,
  CardInner,
  EventTitle,
  EventDescription,
  EventMeta,
  MetaRow,
  CardFooter,
  CapacityBar,
  CapacityLabel,
  CapacityTrack,
  CapacityFill,
  StatusPill,
} from '../../styles/Dashboards/Attendee/BrowseEvents.styles';
import {
  CalendarSVG,
  LocationSVG,
  UsersSVG,
  TicketSVG,
  CheckCircleSVG,
  InfoSVG,
} from '../../components/SVGs';
import ToastNotification from '../../components/ToastNotification';
import ToastContainer from '../../components/ToastContainer';

// Assign a consistent accent colour per event index
const ACCENTS = ['#3b82f6', '#22c55e', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4'];

const formatEventDate = (isoString) =>
  new Date(isoString).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

const BrowseEvents = () => {
  const [events, setEvents]         = useState([]);
  const [loading, setLoading]       = useState(true);
  const [registering, setRegistering] = useState(null); // eventId being registered
  const [toast, setToast]           = useState(null);

  const closeToast = useCallback(() => setToast(null), []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Phase 5: real API only.  Empty state on error — never mock data.
        const data = await getOpenEvents();
        setEvents(Array.isArray(data) ? data : []);
      } catch (err) {
        console.warn('[BrowseEvents] fetch failed:', err?.response?.status ?? err?.message);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleRegister = async (event) => {
    if (event.isRegistered || event.status === 'Full') return;
    setRegistering(event.eventId);

    try {
      // Phase 5: real API only — wait for backend confirmation before updating UI.
      // old: silently swallowed errors with .catch(() => {}), masking real failures.
      await registerForEvent(event.eventId);

      // Mark card as registered, increment count
      setEvents((prev) =>
        prev.map((e) =>
          e.eventId === event.eventId
            ? { ...e, isRegistered: true, registeredCount: (e.registeredCount || 0) + 1 }
            : e
        )
      );

      setToast({
        type: 'success',
        message: `Successfully registered for ${event.title}. A confirmation will appear in your notifications.`,
      });
    } catch (err) {
      // Surface real server errors (EVENT_FULL, ALREADY_REGISTERED, EVENT_CLOSED, etc.)
      const msg = err?.response?.data?.error?.message || 'Registration failed. Please try again.';
      setToast({ type: 'error', message: msg });
    } finally {
      setRegistering(null);
    }
  };

  const openCount = events.filter((e) => e.status === 'Open').length;

  const renderContent = () => {
    if (loading) {
      return (
        <EventGrid>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} style={{ borderRadius: '16px', overflow: 'hidden' }}>
              <Skeleton $h="4px" />
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Skeleton $h="22px" $w="70%" />
                <Skeleton $h="14px" />
                <Skeleton $h="14px" $w="80%" />
                <Skeleton $h="12px" $w="50%" />
              </div>
            </div>
          ))}
        </EventGrid>
      );
    }

    if (events.length === 0) {
      return (
        <EmptyState>
          <CalendarSVG size={36} />
          <EmptyTitle>No open events at the moment</EmptyTitle>
          <EmptySubtitle>
            Check back soon — new campus events will appear here when registration opens.
          </EmptySubtitle>
        </EmptyState>
      );
    }

    return (
      <EventGrid>
        {events.map((event, idx) => {
          const pct = Math.round((event.registeredCount / event.capacity) * 100);
          const accent = ACCENTS[idx % ACCENTS.length];
          const isRegistering = registering === event.eventId;

          return (
            <EventCard key={event.eventId}>
              <CardAccentBar $color={accent} />

              <CardInner>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                  <EventTitle>{event.title}</EventTitle>
                  <StatusPill $status={event.status}>{event.status}</StatusPill>
                </div>

                <EventDescription>{event.description}</EventDescription>

                <EventMeta>
                  <MetaRow>
                    <CalendarSVG size={13} />
                    {formatEventDate(event.date)}
                  </MetaRow>
                  <MetaRow>
                    <LocationSVG size={13} />
                    {event.venue}
                  </MetaRow>
                  <MetaRow>
                    <UsersSVG size={13} />
                    {event.registeredCount} / {event.capacity} registered
                  </MetaRow>
                </EventMeta>
              </CardInner>

              <CardFooter>
                <CapacityBar>
                  <CapacityLabel>{pct}% full</CapacityLabel>
                  <CapacityTrack>
                    <CapacityFill $pct={pct} />
                  </CapacityTrack>
                </CapacityBar>

                <ActionBtn
                  onClick={() => handleRegister(event)}
                  disabled={event.isRegistered || event.status === 'Full' || isRegistering}
                  style={{ whiteSpace: 'nowrap', minWidth: '120px' }}
                >
                  {event.isRegistered ? (
                    <>
                      <CheckCircleSVG size={15} />
                      Registered
                    </>
                  ) : event.status === 'Full' ? (
                    'Event Full'
                  ) : isRegistering ? (
                    'Joining...'
                  ) : (
                    <>
                      <TicketSVG size={15} />
                      Join Event
                    </>
                  )}
                </ActionBtn>
              </CardFooter>
            </EventCard>
          );
        })}
      </EventGrid>
    );
  };

  return (
    <>
      <PortalPageLayout
        title="Browse & Register"
        subtitle={loading ? 'Loading events...' : `${openCount} event${openCount !== 1 ? 's' : ''} open for registration`}
        headerRight={
          !loading && (
            <InfoBanner style={{ margin: 0, padding: '8px 14px' }}>
              <InfoSVG size={14} />
              Joining an event sends a confirmation to your notifications.
            </InfoBanner>
          )
        }
      >
        {renderContent()}
      </PortalPageLayout>

      {toast && (
        <ToastContainer>
          <ToastNotification message={toast.message} type={toast.type} onClose={closeToast} />
        </ToastContainer>
      )}
    </>
  );
};

export default BrowseEvents;
