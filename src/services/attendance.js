import api from './api';

export const getQRCode = (eventId) =>
  api.get(`/attendance/qr-code/${eventId}`).then(r => r.data);

export const scanQR = (payload) =>
  api.post('/attendance/scan', payload).then(r => r.data);

export const getSessionAttendees = (sessionId, params = {}) =>
  api.get(`/attendance/session/${sessionId}`, { params }).then(r => r.data);

export const updateAttendance = (id, status) =>
  api.put(`/attendance/${id}`, { status }).then(r => r.data);

// added Phase 6: lightweight present/total counter for the staff scanner widget
export const getSessionStats = (sessionId) =>
  api.get(`/attendance/session/${sessionId}/stats`).then(r => r.data);

export default { getQRCode, scanQR, getSessionAttendees, updateAttendance, getSessionStats };
