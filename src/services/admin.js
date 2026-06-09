import api from './api';

// frontend service for /api/admin/* endpoints
// all calls require Admin or Organizer jwt (attached automatically by api.js interceptor)

export const getAdminStats = async () => {
  const res = await api.get('/admin/stats');
  return res.data;
};

export const getSessionAttendance = async () => {
  const res = await api.get('/admin/attendance/sessions');
  return res.data;
};

export const getActivityLog = async ({ page = 1, pageSize = 10 } = {}) => {
  const res = await api.get('/admin/activity', { params: { page, pageSize } });
  return res.data;
};

export const getAdminEvents = async ({ status, page = 1, pageSize = 20 } = {}) => {
  const res = await api.get('/admin/events', { params: { status, page, pageSize } });
  return res.data;
};

export const createEvent = async (eventData) => {
  const res = await api.post('/admin/events', eventData);
  return res.data;
};

export const updateEvent = async (id, eventData) => {
  const res = await api.put(`/admin/events/${id}`, eventData);
  return res.data;
};

export const deleteEvent = async (id) => {
  const res = await api.delete(`/admin/events/${id}`);
  return res.data;
};

// added Phase 1 — session management under an event
export const createSession = async (sessionData) => {
  const res = await api.post('/admin/sessions', sessionData);
  return res.data;
};

export const getSessions = async ({ eventId, page = 1, pageSize = 20 } = {}) => {
  const res = await api.get('/admin/sessions', { params: { eventId, page, pageSize } });
  return res.data;
};

// added Phase 1 — staff list for FacilitatorDropdown
export const getStaff = async () => {
  const res = await api.get('/admin/staff');
  return res.data;
};

// user management — Admin only
// getAdminUsers fetches a paginated list of all users, optionally filtered by role or search term
export const getAdminUsers = async ({ page = 1, pageSize = 20, q, role } = {}) => {
  const res = await api.get('/admin/users', { params: { page, pageSize, q, role } });
  return res.data;
};

// createAdminUser sends the new user payload to the backend.
// body shape: { fullName, email, password, role }
// role must be one of: Admin, Organizer, Staff
export const createAdminUser = async (userData) => {
  const res = await api.post('/admin/users', userData);
  return res.data;
};

export default {
  getAdminStats,
  getSessionAttendance,
  getActivityLog,
  getAdminEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  createSession,
  getSessions,
  getStaff,
  getAdminUsers,
  createAdminUser,
};
