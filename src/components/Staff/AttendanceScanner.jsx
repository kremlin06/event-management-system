
// Reusable QR attendance scanner workspace — Blueprint 7.
//
// session picker -> present-count-vs-capacity counter -> two panes
// (Session Info + searchable Manual Override | QR Scanner + Live Feed) -> mobile
// bottom-nav that toggles the Scan / Roster panes. getUserMedia camera + green/red
// scan feedback live in <QRScanner/>; each scan triggers a Notification (FR-08)
// and an optimistic counter bump (no wait for the 30s poll).
//
// layout-agnostic ON PURPOSE: render it inside <StaffLayout> (staff portal) or
// <AdminLayout> (admin dashboard) so each role gets the scanner inside its OWN
// chrome. extracted from StaffDashboardLayout.jsx (Phase 7) so Admin/Organizer no
// longer borrow the staff portal shell to scan attendance.

import { useState, useCallback, useEffect } from 'react';
import QRScanner from './QRScanner';
import LiveFeed from './LiveFeed';
import ManualOverride from './ManualOverride';
import useStaffSession from '../../hooks/useStaffSession';
import {
  CameraSVG,
  UsersSVG,
  CheckCircleSVG,
} from '../SVGs';
import * as S from '../../styles/Staff/StaffDashboard.styles';
import { SkeletonLine } from '../Shared/Skeleton';

// mobile tab keys
const TAB_SCAN   = 'scan';
const TAB_ROSTER = 'roster';

const AttendanceScanner = () => {
  const {
    events, sessions,
    eventId, setEventId,
    sessionId, setSessionId,
    loadingEvents, loadingSessions,
    activeSession, sessionStats,
    bumpCheckedIn,
  } = useStaffSession();

  const [scanResults, setScanResults] = useState([]);
  // mobile bottom-nav active tab
  const [mobileTab,   setMobileTab]   = useState(TAB_SCAN);

  // clear the local scan feed whenever the session changes
  useEffect(() => { setScanResults([]); }, [sessionId]);

  // when QRScanner reports a successful scan, push it to LiveFeed and
  // optimistically increment the checkedIn counter without waiting for the poll
  const handleScanSuccess = useCallback((result) => {
    setScanResults((prev) => [{
      type: 'scan',
      attendanceId: result.attendanceId,
      userId: result.userId,
      fullName: result.fullName,
      studentId: result.studentId ?? null,
      status: result.status,
      checkInTime: result.checkInTime,
    }, ...prev].slice(0, 50));

    // optimistic: only bump if status is Present or Late
    if (['Present', 'Late'].includes(result.status)) {
      bumpCheckedIn();
    }
  }, [bumpCheckedIn]);

  return (
    <>
      <S.LayoutContent>
        {/* Session selector */}
        <S.SelectorBar>
          <label htmlFor="sd-event">Event</label>
          {loadingEvents
            ? <SkeletonLine $h="36px" $w="240px" $mb="0" aria-label="Loading events" />
            : (
              <S.SelectorSelectWrap>
                <S.SelectorSelect
                  id="sd-event"
                  value={eventId}
                  onChange={(e) => setEventId(e.target.value)}
                >
                  <option value="">Select an event...</option>
                  {events.map((ev) => (
                    <option key={ev.id} value={ev.id}>{ev.title}</option>
                  ))}
                </S.SelectorSelect>
              </S.SelectorSelectWrap>
            )
          }

          <label htmlFor="sd-session">Session</label>
          {loadingSessions
            ? <SkeletonLine $h="36px" $w="240px" $mb="0" aria-label="Loading sessions" />
            : (
              <S.SelectorSelectWrap>
                <S.SelectorSelect
                  id="sd-session"
                  value={sessionId}
                  onChange={(e) => setSessionId(e.target.value)}
                  disabled={!eventId}
                >
                  <option value="">Select a session...</option>
                  {sessions.map((s) => (
                    <option key={s.id} value={s.id}>{s.title}</option>
                  ))}
                </S.SelectorSelect>
              </S.SelectorSelectWrap>
            )
          }
        </S.SelectorBar>

        {/* Present counter bar */}
        {sessionId && (
          <S.PresentCountBar
            aria-live="polite"
            aria-label="Check-in progress"
            style={{ borderRadius: '12px', marginBottom: '1.25rem', border: '1px solid var(--border-color)' }}
          >
            <CheckCircleSVG size={14} aria-hidden="true" />
            <span className="count">{sessionStats.checkedIn}</span>
            <span className="sep">/</span>
            <span className="count">
              {sessionStats.total || activeSession?.capacity || '—'}
            </span>
            <span className="label">attendees checked in</span>
          </S.PresentCountBar>
        )}

        {/* Main content */}
        <S.TwoPaneLayout>

          {/* Left pane: session info + manual roster override */}
          <S.Pane $mobileHide={mobileTab !== TAB_ROSTER}>

            {activeSession && (
              <S.Card>
                <S.CardHeader>
                  <h2>Session Info</h2>
                  {sessionId && <S.LiveBadge aria-label="Live session">Live</S.LiveBadge>}
                </S.CardHeader>
                <S.CardBody>
                  <S.SessionMeta>
                    <S.MetaRow>
                      <span>Session</span>
                      <span>{activeSession.title}</span>
                    </S.MetaRow>
                    {activeSession.venue && (
                      <S.MetaRow>
                        <span>Venue</span>
                        <span>{activeSession.venue}</span>
                      </S.MetaRow>
                    )}
                    {activeSession.capacity && (
                      <S.MetaRow>
                        <span>Capacity</span>
                        <span>{activeSession.capacity}</span>
                      </S.MetaRow>
                    )}
                    {activeSession.schedule && (
                      <S.MetaRow>
                        <span>Start Time</span>
                        <span>
                          {new Date(activeSession.schedule).toLocaleString('en-PH', {
                            dateStyle: 'medium', timeStyle: 'short',
                          })}
                        </span>
                      </S.MetaRow>
                    )}
                  </S.SessionMeta>
                </S.CardBody>
              </S.Card>
            )}

            <S.Card>
              <S.CardHeader>
                <h2>
                  <UsersSVG size={15} style={{ marginRight: 6 }} />
                  Manual Override
                </h2>
              </S.CardHeader>
              <S.CardBody style={{ padding: '1rem' }}>
                <ManualOverride sessionId={sessionId ? Number(sessionId) : null} />
              </S.CardBody>
            </S.Card>
          </S.Pane>

          {/* Right pane: QR scanner + live feed */}
          <S.Pane $mobileHide={mobileTab !== TAB_SCAN}>

            <S.Card>
              <S.CardHeader>
                <h2>
                  <CameraSVG size={15} style={{ marginRight: 6 }} />
                  QR Scanner
                </h2>
              </S.CardHeader>
              <S.CardBody>
                <QRScanner
                  sessionId={sessionId ? Number(sessionId) : null}
                  onScanSuccess={handleScanSuccess}
                />
              </S.CardBody>
            </S.Card>

            <S.Card>
              <S.CardHeader>
                <h2>Live Feed</h2>
                {sessionId && (
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>
                    Click entry to correct status
                  </span>
                )}
              </S.CardHeader>
              <LiveFeed
                sessionId={sessionId ? Number(sessionId) : null}
                externalEntries={scanResults}
              />
            </S.Card>
          </S.Pane>

        </S.TwoPaneLayout>
      </S.LayoutContent>

      {/* Mobile bottom navigation (≤900px) — toggle Scan / Roster panes */}
      <S.BottomNav aria-label="Scanner navigation">
        <S.BottomNavBtn
          $active={mobileTab === TAB_SCAN}
          onClick={() => setMobileTab(TAB_SCAN)}
          aria-label="Scanner view"
          aria-pressed={mobileTab === TAB_SCAN}
        >
          <CameraSVG size={20} aria-hidden="true" />
          Scan
        </S.BottomNavBtn>

        <S.BottomNavBtn
          $active={mobileTab === TAB_ROSTER}
          onClick={() => setMobileTab(TAB_ROSTER)}
          aria-label="Roster and manual override"
          aria-pressed={mobileTab === TAB_ROSTER}
        >
          <UsersSVG size={20} aria-hidden="true" />
          Roster
        </S.BottomNavBtn>
      </S.BottomNav>
    </>
  );
};

export default AttendanceScanner;
