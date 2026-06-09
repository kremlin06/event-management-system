// src/pages/Attendee/NotificationsPage.jsx
// Notifications — shows all in-app notifications for the authenticated attendee.
// Maps to FR-08. Reads from the Notification table filtered to the user's ID.
import { useState, useEffect, useCallback } from 'react';
import PortalPageLayout from '../../components/Attendee/PortalPageLayout';
// old: imported getMockNotifications ("You have been registered for Tech Summit 2026" fake).
// Phase 5: removed — notifications are derived from real Registration/Attendance rows.
import {
  getNotifications,
  markAllNotificationsRead,
  markOneNotificationRead,
} from '../../services/attendee';
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  EmptyState,
  EmptyTitle,
  EmptySubtitle,
  Skeleton,
  ActionBtn,
} from '../../styles/Dashboards/Attendee/AttendeePage.styles';
import {
  NotifList,
  NotifItem,
  NotifIconWrapper,
  NotifBody,
  NotifMessage,
  NotifTime,
  UnreadDot,
  NotifUnreadBadge,
} from '../../styles/Dashboards/Attendee/Notifications.styles';
import {
  BellSVG,
  CheckCircleSVG,
  InfoSVG,
} from '../../components/SVGs';

const TYPE_COLOR = {
  success: '#22c55e',
  info: '#3b82f6',
  warning: '#f59e0b',
};

const TypeIcon = ({ type }) => {
  if (type === 'success') return <CheckCircleSVG size={16} />;
  if (type === 'warning') return <InfoSVG size={16} />;
  return <BellSVG size={16} />;
};

// Format relative time — "2 minutes ago", "3 hours ago", etc.
// old: no null guard — new Date(undefined) → NaN, producing "NaN days ago".
// new: guard null/undefined/invalid before doing any math.
const relativeTime = (isoString) => {
  if (!isoString) return 'Just now';
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return 'Just now';

  const diff  = Date.now() - d.getTime();
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days  = Math.floor(diff / 86400000);

  if (mins  < 1)  return 'Just now';
  if (mins  < 60) return `${mins} minute${mins !== 1 ? 's' : ''} ago`;
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  return `${days} day${days !== 1 ? 's' : ''} ago`;
};

const NotificationsPage = () => {
  const [notifs, setNotifs]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        // Phase 5: real API only — empty state on error, never mock.
        const data = await getNotifications();
        setNotifs(Array.isArray(data) ? data : []);
      } catch (err) {
        console.warn('[NotificationsPage] fetch failed:', err?.response?.status ?? err?.message);
        setNotifs([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleMarkAllRead = useCallback(async () => {
    setMarking(true);
    try {
      await markAllNotificationsRead().catch(() => {});
      setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
    } finally {
      setMarking(false);
    }
  }, []);

  // clicking on an unread notification row marks just that one as read.
  // optimistically updates the local state immediately so the ui feels instant,
  // then calls the backend to persist it. if the backend fails we leave the
  // local state as-is (the user sees it as read, which is fine for ux).
  const handleMarkOneRead = useCallback(async (notif) => {
    if (notif.read) return; // already read — no-op
    setNotifs((prev) =>
      prev.map((n) => n.id === notif.id ? { ...n, read: true } : n)
    );
    await markOneNotificationRead(notif.id).catch(() => {});
  }, []);

  // old: n.isRead — backend sends `read`, not `isRead`
  const unreadCount = notifs.filter((n) => !n.read).length;

  const renderContent = () => {
    if (loading) {
      return (
        <Card>
          <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <Skeleton $h="36px" $w="36px" style={{ borderRadius: '50%', flexShrink: 0 }} />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <Skeleton $h="14px" />
                  <Skeleton $h="14px" $w="75%" />
                  <Skeleton $h="12px" $w="30%" />
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      );
    }

    if (notifs.length === 0) {
      return (
        <Card>
          <CardBody>
            <EmptyState>
              <BellSVG size={36} />
              <EmptyTitle>No notifications yet</EmptyTitle>
              <EmptySubtitle>
                Registration confirmations and event reminders will appear here.
              </EmptySubtitle>
            </EmptyState>
          </CardBody>
        </Card>
      );
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle>
            Notifications
            {/* old: inline-styled span with hardcoded hex colours */}
            {unreadCount > 0 && (
              <NotifUnreadBadge>{unreadCount} new</NotifUnreadBadge>
            )}
          </CardTitle>

          {unreadCount > 0 && (
            <ActionBtn
              $variant="ghost"
              onClick={handleMarkAllRead}
              disabled={marking}
              style={{ padding: '6px 14px', minHeight: 'auto', fontSize: '0.8rem' }}
            >
              {marking ? 'Marking...' : 'Mark all as read'}
            </ActionBtn>
          )}
        </CardHeader>

        <NotifList>
          {notifs.map((notif) => (
            /* clicking an unread row marks just that notification as read.
               the $unread prop sets cursor:pointer when there's an action to take. */
            <NotifItem
              key={notif.id}
              $unread={!notif.read}
              onClick={() => handleMarkOneRead(notif)}
              role={!notif.read ? 'button' : undefined}
              tabIndex={!notif.read ? 0 : undefined}
              onKeyDown={!notif.read ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') handleMarkOneRead(notif);
              } : undefined}
              aria-label={!notif.read ? `Mark as read: ${notif.message}` : undefined}
            >
              <NotifIconWrapper $color={TYPE_COLOR[notif.type] || TYPE_COLOR.info}>
                <TypeIcon type={notif.type} />
              </NotifIconWrapper>

              <NotifBody>
                <NotifMessage $unread={!notif.read}>{notif.message}</NotifMessage>
                <NotifTime>{relativeTime(notif.createdAt)}</NotifTime>
              </NotifBody>

              {!notif.read && <UnreadDot aria-label="Unread notification" />}
            </NotifItem>
          ))}
        </NotifList>
      </Card>
    );
  };

  return (
    <PortalPageLayout
      title="Notifications"
      subtitle={
        loading ? 'Loading...' :
        unreadCount > 0 ? `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}` :
        'All caught up'
      }
    >
      {renderContent()}
    </PortalPageLayout>
  );
};

export default NotificationsPage;
