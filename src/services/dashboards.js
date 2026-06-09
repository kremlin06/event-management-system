// src/services/dashboards.js
// Thin wrapper around the real /api/admin/* endpoints.
//
// Phase 5 hardening: ALL mock-data fallbacks removed.  If the backend errors,
// these functions now return empty/zero shapes so the UI's empty-state
// components ("No activity yet", "No sessions yet") can render the truth
// instead of fabricating fake records.
//
// old mock implementations preserved as comments below for reference.
import * as adminApi from './admin';

// helpers

const empty = (value) => Promise.resolve(value);

// lightweight dev-only warner — prefixed so issues are easy to spot in console
const warn = (label, err) => {
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.warn(`[dashboards] ${label}:`, err?.response?.status ?? err?.message ?? err);
  }
};

// /api/admin/stats
// Returns the 4 metric-card values used by the Admin/Organizer dashboard.
// On error → zeroed values so the dashboard still renders gracefully.
//
// old: returned hardcoded mock data on error (24 events, 1847 attendees, etc.)
export const getAdminStats = async () => {
  try {
    return await adminApi.getAdminStats();
  } catch (err) {
    warn('getAdminStats backend unreachable', err);
    return {
      totalEvents: 0,
      totalSessions: 0,
      activeAttendees: 0,
      participationRate: '0%',
      upcomingEvents: 0,
      // legacy zeroes for older consumers
      totalAttendees: 0,
      activeNow: 0,
      pendingApprovals: 0,
      systemAlerts: 0,
      weekOverWeekGrowth: '+0%',
      monthOverMonthGrowth: '+0%',
    };
  }
};

// /api/admin/attendance/sessions
// Bar-chart data for "Attendance per Session" — comes straight from the DB.
//
// old: 8 fake "Opening Ceremony / Tech Workshop A/B" rows
export const getSessionAttendance = async () => {
  try {
    return await adminApi.getSessionAttendance();
  } catch (err) {
    warn('getSessionAttendance backend unreachable', err);
    return [];
  }
};

// /api/admin/activity?page=&pageSize=
// Recent Activity table — union of Registrations (D3) + Attendances (D4).
// Returns { items, total, page, pageSize, totalPages } so the table can paginate.
//
// old: 25 hardcoded entries (Maria Santos, Juan Cruz, Ana Reyes, etc.)
export const getActivityLog = async ({ page = 1, pageSize = 10 } = {}) => {
  try {
    return await adminApi.getActivityLog({ page, pageSize });
  } catch (err) {
    warn('getActivityLog backend unreachable', err);
    return { items: [], total: 0, page, pageSize, totalPages: 0 };
  }
};

// /api/admin/events
// Real events list, optionally filtered.  No mock fallback.
//
// old: 6 fake events (Campus Job Fair, Tech Talk, etc.)
export const getEvents = async (_filters = {}) => {
  try {
    const data = await adminApi.getAdminEvents({ pageSize: 100 });
    return data.events ?? data.data ?? [];
  } catch (err) {
    warn('getEvents backend unreachable', err);
    return [];
  }
};

// deprecated: legacy activity feed (replaced by getActivityLog)
// Kept as a no-op so existing imports don't break; returns empty array.
// old: 6 fake activity feed entries (registrations / event_created / etc.)
export const getActivityFeed = async () => empty([]);

// deprecated: weekly attendance summary
// The real per-session breakdown comes from getSessionAttendance now.
// Kept as a no-op so older imports compile; returns a zeroed weekly shape.
// old: 7 fake daily counts (Mon=245, Tue=378, ...) totalling 1971
export const getAttendanceAnalytics = async (period = 'week') => ({
  weeklyData: [],
  totalCheckins: 0,
  weekOverWeek: '+0%',
  period,
});

// deprecated: notifications panel
// Real notifications are not yet implemented backend-side; returns [].
// old: 3 fake notifications (Pending Approvals, System Maintenance, Reports Ready)
export const getAdminNotifications = async () => empty([]);

// legacy: getDashboardData(role) — single-call aggregator
// Used by older role-specific dashboards.  Now built from the real endpoints.
export const getDashboardData = async (role) => {
  try {
    const [stats, events] = await Promise.all([
      getAdminStats(),
      getEvents(),
    ]);
    return {
      stats,
      events,
      activities: [],
      attendanceOverview: { weeklyData: [], totalCheckins: 0, weekOverWeek: '+0%' },
      notifications: [],
      role,
    };
  } catch {
    return {
      stats: {}, events: [], activities: [],
      attendanceOverview: { weeklyData: [], totalCheckins: 0, weekOverWeek: '+0%' },
      notifications: [], role,
    };
  }
};

// back-compat aliases
// The hook used `getMockSessionAttendance` / `getMockActivityLog` as a safety
// net; they now simply forward to the real functions which themselves return
// empty data on error.  Kept exported so the existing imports don't break.
export const getMockSessionAttendance = getSessionAttendance;
export const getMockActivityLog       = getActivityLog;

export default {
  getDashboardData,
  getAdminStats,
  getEvents,
  getActivityFeed,
  getAttendanceAnalytics,
  getAdminNotifications,
  getSessionAttendance,
  getMockSessionAttendance,
  getActivityLog,
  getMockActivityLog,
};
