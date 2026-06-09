// src/hooks/dashboards/useAdminDashboard.js
// Phase 5 hardening: all mock-data fallbacks removed.
// The service layer (services/dashboards.js) now returns empty shapes on error,
// so the UI's empty-state components render real "No data yet" copy instead of
// fake records.
import { useState, useEffect, useCallback } from 'react';
import {
  getAdminStats,
  getEvents,
  getActivityFeed,
  getAttendanceAnalytics,
  getAdminNotifications,
  getSessionAttendance,
  getActivityLog,
} from '../../services/dashboards';

// old: had .catch(() => getMockX()) fallbacks that papered over backend errors
// new: rely on service-layer empty-on-error semantics; surface real state to the UI

export const useAdminDashboard = () => {
   const [stats,              setStats]              = useState(null);
   const [events,             setEvents]             = useState([]);
   const [activities,         setActivities]         = useState([]);
   const [attendanceOverview, setAttendanceOverview] = useState(null);
   const [notifications,      setNotifications]      = useState([]);
   const [loading,            setLoading]            = useState(true);
   const [error,              setError]              = useState(null);

   // Phase 3 — session attendance (bar chart) + paginated activity log
   const [sessionAttendance,   setSessionAttendance]   = useState([]);
   const [activityLog,         setActivityLog]         = useState([]);
   const [activityLogTotal,    setActivityLogTotal]    = useState(0);
   const [activityLogPage,     setActivityLogPage]     = useState(1);
   const PAGE_SIZE = 10;

   // refresh function (kept for manual reload after event/session creation)
   const fetchData = useCallback(async () => {
      try {
         setLoading(true);
         setError(null);

         const [statsData, eventsData, sessionData] = await Promise.all([
            getAdminStats(),
            getEvents(),
            getSessionAttendance(),
         ]);

         setStats(statsData);
         setEvents(eventsData);
         setSessionAttendance(sessionData);
         setActivities([]);              // legacy field — no longer used
         setAttendanceOverview(null);    // legacy field — no longer used
         setNotifications([]);           // legacy field — no longer used
      } catch (err) {
         console.error('[useAdminDashboard] fetchData failed:', err);
         setError(err?.message || 'Failed to load dashboard data');
      } finally {
         setLoading(false);
      }
   }, []);

   // paginated activity log (refetches when page changes)
   const fetchActivityLog = useCallback(async (page) => {
      try {
         // service returns { items, total, page, pageSize, totalPages } even on error
         const result = await getActivityLog({ page, pageSize: PAGE_SIZE });
         setActivityLog(result.items || []);
         setActivityLogTotal(result.total || 0);
      } catch (err) {
         console.error('[useAdminDashboard] fetchActivityLog failed:', err);
         setActivityLog([]);
         setActivityLogTotal(0);
      }
   }, []);

   useEffect(() => {
      fetchActivityLog(activityLogPage);
   }, [activityLogPage, fetchActivityLog]);

   // initial load (parallel fetch of all top-section data)
   useEffect(() => {
      let isMounted = true;

      const loadDashboard = async () => {
         try {
            setLoading(true);
            setError(null);

            const [statsData, eventsData, sessionData] = await Promise.all([
               getAdminStats(),
               getEvents(),
               getSessionAttendance(),
            ]);

            if (isMounted) {
               setStats(statsData);
               setEvents(eventsData);
               setSessionAttendance(sessionData);
               setActivities([]);
               setAttendanceOverview(null);
               setNotifications([]);
            }
         } catch (err) {
            if (isMounted) {
               console.error('[useAdminDashboard] initial load failed:', err);
               setError(err?.message || 'Failed to load dashboard data');
            }
         } finally {
            if (isMounted) setLoading(false);
         }
      };

      loadDashboard();
      return () => { isMounted = false; };
   }, []);

   return {
      stats,
      events,
      activities,
      attendanceOverview,
      notifications,
      loading,
      error,
      refresh: fetchData,
      sessionAttendance,
      activityLog,
      activityLogTotal,
      activityLogPage,
      setActivityLogPage,
      activityLogPageSize: PAGE_SIZE,
   };
};

export default useAdminDashboard;
