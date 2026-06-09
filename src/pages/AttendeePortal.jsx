// src/pages/AttendeePortal.jsx
// Attendee role portal — hub page with 5 action cards.
// UPDATED: zero-emoji policy applied, Footer added, QR card enabled (Phase 2 complete).
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/useAuth';
import {
  CalendarSVG,
  EventSVG,
  BellSVG,
  ClockSVG,
  QrCodeSVG,
  InfoSVG,
} from '../components/SVGs';
import {
  PortalPageWrapper,
  PortalContainer,
  WelcomeHeader,
  WelcomeLeft,
  WelcomeTitle,
  WelcomeSubtitle,
  DateChip,
  InfoBanner,
  PortalSection,
  SectionLabel,
  PortalGrid,
  PortalCard,
  CardIconWrapper,
  CardContent,
  CardLabel,
  CardDescription,
  // OLD: DisabledBadge — QR card no longer disabled in Phase 2
  // DisabledBadge,
} from '../styles/Dashboards/Attendee/AttendeePortal.styles';

// Accent colours for each card — deliberate single-accent-per-card Apple HIG approach
const CARD_ACCENT = {
  schedule: '#3b82f6', // blue
  events: '#22c55e', // green
  qr: '#8b5cf6', // purple
  history: '#f59e0b', // amber
  notifications: '#ef4444', // red
};

const AttendeePortal = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const firstName = user?.fullName?.split(' ')[0] || 'Student';

  // 5 portal action cards — all enabled in Phase 2
  // OLD: QR card had disabled: true. MODIFIED: all cards are now active.
  const portalCards = [
    {
      id: 'schedule',
      label: 'My Schedule',
      description: 'View your upcoming registered sessions and personal event timetable.',
      icon: <CalendarSVG size={24} />,
      accent: CARD_ACCENT.schedule,
      route: '/attendee/schedule',
    },
    {
      id: 'events',
      label: 'Browse & Register',
      description: 'Discover open campus events and join with one tap.',
      icon: <EventSVG size={24} />,
      accent: CARD_ACCENT.events,
      route: '/attendee/events',
    },
    {
      id: 'qr',
      label: 'My QR Code',
      description: 'Personal check-in QR code — present to staff at the event entrance.',
      icon: <QrCodeSVG size={24} />,
      accent: CARD_ACCENT.qr,
      route: '/attendee/qr',
    },
    {
      id: 'history',
      label: 'Attendance History',
      description: 'Review your full attendance log across all recorded sessions.',
      icon: <ClockSVG size={24} />,
      accent: CARD_ACCENT.history,
      route: '/attendee/history',
    },
    {
      id: 'notifications',
      label: 'Notifications',
      description: 'Registration confirmations, reminders, and campus announcements.',
      icon: <BellSVG size={24} />,
      accent: CARD_ACCENT.notifications,
      route: '/attendee/notifications',
    },
  ];

  const handleCardClick = (card) => navigate(card.route);

  return (
    <PortalPageWrapper>
      {/* Navbar included directly — global one in App.jsx is commented out.
          Attendee pages need their own Navbar instance for role-specific links. */}
      <Navbar />

      <PortalContainer>
        {/* Welcome header */}
        <WelcomeHeader>
          <WelcomeLeft>
            {/* OLD: "Welcome back, {firstName} 👋" — emoji removed per zero-emoji policy */}
            <WelcomeTitle>Welcome back, {firstName}</WelcomeTitle>
            <WelcomeSubtitle>
              Your student event portal — register, attend, and track campus activities.
            </WelcomeSubtitle>
          </WelcomeLeft>

          <DateChip>
            <CalendarSVG size={14} />
            {currentDate}
          </DateChip>
        </WelcomeHeader>

        {/* Info banner — OLD: used "ℹ️" emoji. MODIFIED: replaced with InfoSVG */}
        <InfoBanner>
          <InfoSVG size={18} style={{ flexShrink: 0, marginTop: 2 }} />
          <span>
            You are signed in as an <strong>Attendee</strong>. To request elevated access
            (Organizer or Staff), contact your campus Administrator.
          </span>
        </InfoBanner>

        {/* Portal action card grid */}
        <PortalSection>
          <SectionLabel>Quick Access</SectionLabel>

          <PortalGrid>
            {portalCards.map((card) => (
              <PortalCard
                key={card.id}
                onClick={() => handleCardClick(card)}
                $accentColor={card.accent}
                aria-label={card.label}
              >
                <CardIconWrapper $color={card.accent}>
                  {card.icon}
                </CardIconWrapper>

                <CardContent>
                  <CardLabel>{card.label}</CardLabel>
                  <CardDescription>{card.description}</CardDescription>
                </CardContent>
              </PortalCard>
            ))}
          </PortalGrid>
        </PortalSection>
      </PortalContainer>

      {/* ADDED: Footer with Manifesto, Privacy, Terms links + ThemeToggle bottom-left */}
      <Footer />
    </PortalPageWrapper>
  );
};

export default AttendeePortal;
