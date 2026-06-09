// src/hooks/useStaffSession.js
// shared session-picker logic for the staff Dashboard and Scanner pages.
//
// both pages need the exact same flow: load events -> pick an event -> load that
// event's sessions -> pick a session -> fetch + poll the present/total counter.
// rather than duplicate the four useEffects in two components, this hook owns
// all of it and returns a small, stable api.
//
// returns:
//   events, sessions               — option lists for the two dropdowns
//   eventId, setEventId             — selected event (string id)
//   sessionId, setSessionId         — selected session (string id)
//   loadingEvents, loadingSessions  — skeleton flags
//   activeSession                   — the full session object for sessionId (or undefined)
//   sessionStats                    — { checkedIn, total }
//   bumpCheckedIn()                 — optimistic +1 to checkedIn (called on a scan)

import { useState, useEffect, useCallback, useRef } from 'react';
import { getAdminEvents, getSessions } from '../services/admin';
import { getSessionStats } from '../services/attendance';

const STATS_POLL_MS = 30_000;

export default function useStaffSession() {
  const [events,          setEvents]          = useState([]);
  const [sessions,        setSessions]        = useState([]);
  const [eventId,         setEventId]         = useState('');
  const [sessionId,       setSessionId]       = useState('');
  const [loadingEvents,   setLoadingEvents]   = useState(true);
  const [loadingSessions, setLoadingSessions] = useState(false);
  const [sessionStats,    setSessionStats]    = useState({ checkedIn: 0, total: 0 });

  const statsIntervalRef = useRef(null);

  // load events once on mount (route is open to Staff — adminRoutes fixed Phase 6)
  useEffect(() => {
    setLoadingEvents(true);
    getAdminEvents({ pageSize: 100 })
      .then((d) => setEvents(d.events ?? d.data ?? []))
      .catch((err) => console.error('[useStaffSession] events fetch failed:', err))
      .finally(() => setLoadingEvents(false));
  }, []);

  // reload sessions whenever the chosen event changes
  useEffect(() => {
    setSessionId('');
    setSessions([]);
    if (!eventId) return;
    setLoadingSessions(true);
    getSessions({ eventId, pageSize: 100 })
      .then((d) => setSessions(d.sessions ?? d.data ?? []))
      .catch((err) => console.error('[useStaffSession] sessions fetch failed:', err))
      .finally(() => setLoadingSessions(false));
  }, [eventId]);

  // fetch present/total stats when the session changes; poll to stay fresh
  useEffect(() => {
    clearInterval(statsIntervalRef.current);
    setSessionStats({ checkedIn: 0, total: 0 });

    if (!sessionId) return;

    const fetchStats = () =>
      getSessionStats(sessionId)
        .then((s) => setSessionStats(s))
        .catch(() => {});

    fetchStats();
    statsIntervalRef.current = setInterval(fetchStats, STATS_POLL_MS);
    return () => clearInterval(statsIntervalRef.current);
  }, [sessionId]);

  const activeSession = sessions.find((s) => String(s.id) === String(sessionId));

  // optimistic counter bump so the UI reacts instantly to a successful scan
  // without waiting for the next 30s poll
  const bumpCheckedIn = useCallback(() => {
    setSessionStats((prev) => ({ ...prev, checkedIn: prev.checkedIn + 1 }));
  }, []);

  return {
    events,
    sessions,
    eventId,
    setEventId,
    sessionId,
    setSessionId,
    loadingEvents,
    loadingSessions,
    activeSession,
    sessionStats,
    bumpCheckedIn,
  };
}
