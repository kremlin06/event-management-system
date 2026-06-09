// src/services/notifications.js
// generic, role-agnostic notifications client (Phase 6 — staff restructure).
//
// the attendee service (services/attendee.js) hits /api/attendee/notifications,
// which is attendee-scoped and merges derived registration / assignment rows.
// staff / organizer / admin pages use these endpoints instead — they read the
// plain Notification table for the authenticated user, regardless of role.
//
// response shape (matches the attendee endpoint so the same list UI works):
//   [{ id, type, title, message, createdAt, read }]
import api from './api';

// GET /api/notifications
export const getMyNotifications = () =>
  api.get('/notifications').then((r) => r.data);

// PATCH /api/notifications/read-all
export const markMyNotificationsRead = () =>
  api.patch('/notifications/read-all').then((r) => r.data);

export default { getMyNotifications, markMyNotificationsRead };
