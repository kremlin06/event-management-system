// src/components/Dashboards/Admin/NotificationPanel.jsx
// Notification fly-out panel for Admin/Organizer — wired to the bell button in
// <AdminLayout>. fetches from GET /api/notifications (role-agnostic endpoint),
// marks all read on open, and closes on overlay click or Escape.
//
// admin notification types (from the Notification table):
//   approval — role/facilitator assignment requests awaiting admin action
//   alert    — system alerts, bulk-upload validation summaries, sync issues
//   report   — export ready (CSV/PDF), analytics refresh after a live session
//   default  — catch-all for automated attendance confirmations (FR-08)
//
// urgency levels drive the left-border accent:
//   high   → error red   (needs immediate attention)
//   medium → warning amber
//   low    → info teal   (default when urgency is missing)
//
// old NotificationPanel.jsx was a broken stub with:
//   - wrong import path (@styles/Dashboards/NotificationPanel.styles — didn't exist)
//   - missing DocumentSVG (now added to SVGs.jsx)
//   - @Shared/DashboardLayout sections (page-level layout, not a dropdown)
//   - no data fetching, no open/close, no real interactivity
// fully replaced here.

import { useState, useEffect, useCallback, useRef } from 'react';
import { getMyNotifications, markMyNotificationsRead } from '../../../services/notifications';
import {
  BellSVG,
  AlertCircleSVG,
  CheckCircleSVG,
  DocumentSVG,
  CheckmarkSVG,
} from '../../SVGs';
import {
  PanelOverlay,
  PanelContainer,
  PanelHeader,
  PanelTitle,
  UnreadBadge,
  MarkAllBtn,
  PanelScrollArea,
  NotificationCard,
  NotificationIcon,
  NotificationContent,
  NotificationTitle,
  NotificationMessage,
  NotificationTime,
  UnreadDot,
  PanelEmptyState,
} from '../../../styles/Dashboards/Admin/NotificationPanel.styles';
import { SkeletonLine } from '../../Shared/Skeleton';

// helpers

// map notification type → icon component
const typeIcon = (type) => {
  switch (type) {
    case 'approval': return <CheckmarkSVG size={17} />;
    case 'alert': return <AlertCircleSVG size={17} />;
    case 'report': return <DocumentSVG size={17} />;
    default: return <BellSVG size={17} />;
  }
};

// human-readable relative timestamp ("2 min ago", "yesterday", etc.)
const relativeTime = (iso) => {
  if (!iso) return '';
  const diff = Date.now() - new Date(iso).getTime();
  const min  = Math.floor(diff / 60_000);
  if (min < 1)   return 'just now';
  if (min < 60)  return `${min} min ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24)   return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  if (day === 1) return 'yesterday';
  if (day < 7)   return `${day} days ago`;
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

// component
const NotificationPanel = ({ isOpen, onClose, onUnreadChange }) => {
  const [items,    setItems]    = useState([]);
  const [loading,  setLoading]  = useState(false);
  const [marking,  setMarking]  = useState(false);
  const panelRef = useRef(null);

  // fetch notifications whenever the panel is opened
  useEffect(() => {
    if (!isOpen) return;

    let active = true;
    setLoading(true);

    getMyNotifications()
      .then((data) => {
        if (!active) return;
        const list = Array.isArray(data) ? data : [];
        setItems(list);
        // report unread count back to the bell button so it can show the badge
        const unread = list.filter((n) => !n.read).length;
        onUnreadChange?.(unread);
      })
      .catch(() => { if (active) setItems([]); })
      .finally(() => { if (active) setLoading(false); });

    return () => { active = false; };
  }, [isOpen, onUnreadChange]);

  // close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // mark all unread → read
  const handleMarkAll = useCallback(async () => {
    const hasUnread = items.some((n) => !n.read);
    if (!hasUnread || marking) return;

    setMarking(true);
    try {
      await markMyNotificationsRead();
      setItems((prev) => prev.map((n) => ({ ...n, read: true })));
      onUnreadChange?.(0);
    } catch {
      // silently ignore — the user can try again
    } finally {
      setMarking(false);
    }
  }, [items, marking, onUnreadChange]);

  if (!isOpen) return null;

  const unread = items.filter((n) => !n.read).length;

  return (
    <>
      {/* transparent overlay — click anywhere outside to close */}
      <PanelOverlay onClick={onClose} aria-hidden="true" />

      <PanelContainer
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Notifications"
      >
        {/* header */}
        <PanelHeader>
          <PanelTitle>Notifications</PanelTitle>
          {unread > 0 && (
            <UnreadBadge aria-label={`${unread} unread`}>{unread}</UnreadBadge>
          )}
          <MarkAllBtn
            onClick={handleMarkAll}
            disabled={marking || unread === 0}
            aria-label="Mark all notifications as read"
          >
            {marking ? 'Marking…' : 'Mark all read'}
          </MarkAllBtn>
        </PanelHeader>

        {/* body */}
        <PanelScrollArea role="list" aria-live="polite" aria-busy={loading}>

          {loading && (
            // skeleton rows while fetching
            Array.from({ length: 4 }).map((_, i) => (
              <SkeletonLine key={i} $h="52px" $mb="8px" style={{ borderRadius: 8 }} />
            ))
          )}

          {!loading && items.length === 0 && (
            <PanelEmptyState>
              <CheckCircleSVG size={32} aria-hidden="true" />
              <p>You're all caught up!</p>
            </PanelEmptyState>
          )}

          {!loading && items.map((notif) => (
            <NotificationCard
              key={notif.id}
              $urgency={notif.urgency}
              $unread={!notif.read}
              role="listitem"
              aria-label={notif.title}
            >
              <NotificationIcon $type={notif.type} aria-hidden="true">
                {typeIcon(notif.type)}
              </NotificationIcon>

              <NotificationContent>
                <NotificationTitle $unread={!notif.read}>
                  {notif.title}
                </NotificationTitle>
                {notif.message && (
                  <NotificationMessage>{notif.message}</NotificationMessage>
                )}
                <NotificationTime>{relativeTime(notif.createdAt)}</NotificationTime>
              </NotificationContent>

              {/* unread indicator dot on the right */}
              {!notif.read && <UnreadDot aria-hidden="true" />}
            </NotificationCard>
          ))}

        </PanelScrollArea>
      </PanelContainer>
    </>
  );
};

export default NotificationPanel;
