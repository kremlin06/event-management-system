// src/pages/Staff/StaffNotifications.jsx
// Staff Notifications — lists the signed-in staff member's in-app notifications
// (FR-08 check-in confirmations + system alerts). Reads the generic
// /api/notifications endpoint, returning the caller's own Notification rows.
// Wrapped in <StaffLayout/> for the shared sidebar/header.
//
// Phase 8: replaced raw inline styles + var() skeleton tokens with proper
// styled-components (SkeletonLine/Circle, NotifUnreadBadge, EmptyStatePage).

import { useState, useEffect, useCallback } from 'react';
import StaffLayout from '../../components/Staff/StaffLayout';
import {
  getMyNotifications,
  markMyNotificationsRead,
} from '../../services/notifications';
import {
  BellSVG,
  CheckCircleSVG,
  AlertCircleSVG,
} from '../../components/SVGs';
import { SkeletonLine, SkeletonCircle } from '../../components/Shared/Skeleton';
import * as S from '../../styles/Staff/StaffDashboard.styles';

// accent color per notification type — feeds the round icon wrapper
const TYPE_COLOR = {
  success: '#22c55e',
  info: '#3b82f6',
  warning: '#f59e0b',
  error: '#ef4444',
};

const TypeIcon = ({ type }) => {
  if (type === 'success') return <CheckCircleSVG size={16} />;
  if (type === 'warning' || type === 'error') return <AlertCircleSVG size={16} />;
  return <BellSVG size={16} />;
};

// relative time — "2 minutes ago", "3 hours ago", guards invalid dates
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

const StaffNotifications = () => {
  const [notifs,  setNotifs]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState(false);

  useEffect(() => {
    let active = true;
    getMyNotifications()
      .then((data) => { if (active) setNotifs(Array.isArray(data) ? data : []); })
      .catch((err) => {
        console.warn('[StaffNotifications] fetch failed:', err?.response?.status ?? err?.message);
        if (active) setNotifs([]);
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const handleMarkAllRead = useCallback(async () => {
    setMarking(true);
    try {
      await markMyNotificationsRead().catch(() => {});
      setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
    } finally {
      setMarking(false);
    }
  }, []);

  const unreadCount = notifs.filter((n) => !n.read).length;

  const renderBody = () => {
    if (loading) {
      return (
        <S.Card>
          <S.CardBody style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                {/* old: inline div with var(--bg-tertiary) background */}
                <SkeletonCircle $size="36px" />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <SkeletonLine $h="14px" $mb="0" />
                  <SkeletonLine $h="14px" $w="75%" $mb="0" />
                  <SkeletonLine $h="10px" $w="30%" $mb="0" />
                </div>
              </div>
            ))}
          </S.CardBody>
        </S.Card>
      );
    }

    if (notifs.length === 0) {
      return (
        <S.Card>
          <S.EmptyStatePage>
            <S.EmptyStateIcon aria-hidden="true">
              <BellSVG size={28} />
            </S.EmptyStateIcon>
            <S.EmptyStateTitle>No notifications yet</S.EmptyStateTitle>
            <S.EmptyStateSub>
              Check-in confirmations and system alerts will appear here.
            </S.EmptyStateSub>
          </S.EmptyStatePage>
        </S.Card>
      );
    }

    return (
      <S.Card>
        <S.CardHeader>
          <h2>
            Notifications
            {/* old: inline styled span — now uses NotifUnreadBadge token */}
            {unreadCount > 0 && (
              <S.NotifUnreadBadge>{unreadCount} new</S.NotifUnreadBadge>
            )}
          </h2>
          {unreadCount > 0 && (
            <S.MarkReadBtn onClick={handleMarkAllRead} disabled={marking}>
              {marking ? 'Marking...' : 'Mark all as read'}
            </S.MarkReadBtn>
          )}
        </S.CardHeader>

        <S.NotifList>
          {notifs.map((n) => (
            <S.NotifItem key={n.id} $unread={!n.read}>
              <S.NotifIconWrapper $color={TYPE_COLOR[n.type] || TYPE_COLOR.info}>
                <TypeIcon type={n.type} />
              </S.NotifIconWrapper>
              <S.NotifBody>
                {n.title && <S.NotifTitle $unread={!n.read}>{n.title}</S.NotifTitle>}
                <S.NotifMessage>{n.message}</S.NotifMessage>
                <S.NotifTime>{relativeTime(n.createdAt)}</S.NotifTime>
              </S.NotifBody>
              {!n.read && <S.UnreadDot aria-label="Unread notification" />}
            </S.NotifItem>
          ))}
        </S.NotifList>
      </S.Card>
    );
  };

  return (
    <StaffLayout
      title="Notifications"
      subtitle={
        loading       ? 'Loading...' :
        unreadCount > 0 ? `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}` :
        'All caught up'
      }
    >
      <S.LayoutContent>
        {renderBody()}
      </S.LayoutContent>
    </StaffLayout>
  );
};

export default StaffNotifications;
