// src/services/attendee.js
// Phase 5: ALL mock fallbacks removed.  The real backend endpoints now exist
// (added in attendeePortalRoutes.js).  Pages that catch errors should fall
// through to their empty-state UI — they MUST NOT inject fake records.
//
// old mock arrays (Campus Tech Summit, Opening Ceremony, Opening Keynote,
// "Tech Summit 2026" notification) are preserved as comments below for ref.
import api from './api';

// Attendee-facing functions

// GET /api/events/open
export const getOpenEvents = () =>
  api.get('/events/open').then((r) => r.data);

// POST /api/attendee/register
export const registerForEvent = (eventId) =>
  api.post('/attendee/register', { eventId }).then((r) => r.data);

// GET /api/attendee/schedule
export const getAttendeeSchedule = () =>
  api.get('/attendee/schedule').then((r) => r.data);

// GET /api/attendee/attendance
export const getAttendanceHistory = () =>
  api.get('/attendee/attendance').then((r) => r.data);

// GET /api/attendee/notifications
export const getNotifications = () =>
  api.get('/attendee/notifications').then((r) => r.data);

// PATCH /api/attendee/notifications/read-all
export const markAllNotificationsRead = () =>
  api.patch('/attendee/notifications/read-all').then((r) => r.data);

// PATCH /api/attendee/notifications/:id/read
// added: marks a single notification as read so the user can dismiss
// individual items without having to "mark all as read" at once.
export const markOneNotificationRead = (id) =>
  api.patch(`/attendee/notifications/${id}/read`).then((r) => r.data);

// Back-compat aliases
// Phase 1–4 code imported `getMockX` from this module.  We keep the exports so
// existing imports compile, but each one now forwards to the REAL endpoint.
// If the network fails the caller's own .catch will fire — there is no
// fabricated payload anywhere in this file.
//
// old: returned hardcoded arrays of fake records.  Removed Phase 5.
export const getMockOpenEvents        = getOpenEvents;
export const getMockSchedule          = getAttendeeSchedule;
export const getMockAttendanceHistory = getAttendanceHistory;
export const getMockNotifications     = getNotifications;

// Admin attendee management (Phase 2 — unchanged)

export const uploadAttendees = (file, eventId, onProgress) => {
  const form = new FormData();
  form.append('file', file);
  form.append('eventId', String(eventId));
  return api.post('/admin/attendees/upload', form, {
    onUploadProgress: (e) => {
      if (onProgress && e.total) onProgress(Math.round((e.loaded * 100) / e.total));
    },
  }).then((r) => r.data);
};

export const createManualAttendee = (data) =>
  api.post('/admin/attendees/manual', data).then((r) => r.data);

export const getAttendees = (eventId, { page = 1, pageSize = 20, status, session, q } = {}) =>
  api.get(`/admin/attendees/${eventId}`, { params: { page, pageSize, status, session, q } }).then((r) => r.data);

export const assignToSessions = (attendeeIds, sessionIds) =>
  api.post('/admin/registrations/assign', { attendeeIds, sessionIds }).then((r) => r.data);

export default { uploadAttendees, createManualAttendee, getAttendees, assignToSessions };
