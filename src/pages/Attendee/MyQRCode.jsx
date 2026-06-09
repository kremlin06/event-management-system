// src/pages/Attendee/MyQRCode.jsx
// My QR Code — displays an HMAC-signed server-issued QR payload per event.
// The payload is fetched from GET /api/attendance/qr-code/:eventId so the HMAC
// secret never reaches the browser. qrcode.react renders the opaque string.
// Mobile: content is displayed normally + a sticky FAB shows a full-screen modal.
import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import PortalPageLayout from '../../components/Attendee/PortalPageLayout';
import { useAuth } from '../../contexts/useAuth';
import { getQRCode } from '../../services/attendance';
import { getOpenEvents } from '../../services/attendee';
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  InfoBanner,
  ActionBtn,
} from '../../styles/Dashboards/Attendee/AttendeePage.styles';
import {
  QRWrapper,
  QRCard,
  QRLabel,
  QRFrame,
  CornerBracket,
  StudentInfo,
  StudentName,
  StudentId,
  FallbackNote,
  InstructionList,
  InstructionItem,
  StickyQRButton,
  QRModal,
  QRModalInner,
  EventSelectWrap,
  EventSelectLabel,
  EventSelect,
} from '../../styles/Dashboards/Attendee/MyQRCode.styles';
import {
  QrCodeSVG,
  CheckCircleSVG,
  InfoSVG,
  UserSVG,
  CloseSVG,
  XCircleSVG,
} from '../../components/SVGs';

// old client-side payload builder — commented out; payload is now server-issued
// const buildQRPayload = (user) =>
//   JSON.stringify({ userId: user.id, studentId: user.studentId || 'N/A', ... });

const QRDisplay = ({ user, qrValue, size = 220 }) => (
  <QRCard>
    <StudentInfo>
      <StudentName>{user.fullName}</StudentName>
      <StudentId>{user.studentId || 'No Student ID on record'}</StudentId>
    </StudentInfo>

    <QRFrame aria-label="Your personal check-in QR code">
      <CornerBracket $pos="tl" />
      <CornerBracket $pos="tr" />
      <CornerBracket $pos="bl" />
      <CornerBracket $pos="br" />
      <QRCodeSVG
        value={qrValue}
        size={size}
        level="H"
        includeMargin={false}
        style={{ display: 'block' }}
      />
    </QRFrame>

    <QRLabel>
      Present this code to the event staff member for check-in.
    </QRLabel>

    <FallbackNote>
      If the scanner cannot read the code, give staff your Student ID above for manual lookup.
    </FallbackNote>
  </QRCard>
);

const MyQRCode = () => {
  const { user }         = useAuth();
  const [showModal, setShowModal] = useState(false);

  const [events,       setEvents]       = useState([]);
  const [selectedId,   setSelectedId]   = useState('');
  const [qrValue,      setQrValue]      = useState('');
  const [loadingQR,    setLoadingQR]    = useState(false);
  const [qrError,      setQrError]      = useState(null);

  // Load open events so the attendee can pick which event to show QR for.
  // Phase 5 fix: the backend now returns rows with `eventId` (not `id`) and
  // `isRegistered`.  The QR code only makes sense for events you're registered
  // for, so we filter to those.  Pre-Phase 5, this swallowed all errors with
  // "Could not load your events." even when the user simply had no events yet.
  useEffect(() => {
    getOpenEvents()
      .then(data => {
        const raw = Array.isArray(data) ? data : (data?.events ?? data?.data ?? []);
        // normalise to { id, title, isRegistered } — tolerant of either field name
        const list = raw
          .map(ev => ({
            id: ev.eventId ?? ev.id,
            title: ev.title,
            isRegistered: ev.isRegistered === true,
          }))
          .filter(ev => ev.isRegistered);
        setEvents(list);
        if (list.length === 1) setSelectedId(String(list[0].id));
      })
      .catch((err) => {
        console.warn('[MyQRCode] getOpenEvents failed:', err?.response?.status ?? err?.message);
        setEvents([]);
        // only show an error banner for real server errors — not for an empty list
        if (err?.response?.status >= 500 || err?.response?.status === undefined) {
          setQrError('Could not load your events. Please try again.');
        }
      });
  }, []);

  // Fetch server-signed QR payload whenever the selected event changes
  useEffect(() => {
    if (!selectedId) { setQrValue(''); return; }
    setLoadingQR(true);
    setQrError(null);
    getQRCode(selectedId)
      .then(data => setQrValue(data.payload))
      .catch(() => setQrError('Could not generate QR code. Make sure you are registered for this event.'))
      .finally(() => setLoadingQR(false));
  }, [selectedId]);

  const instructions = [
    'Open this screen at the event check-in desk.',
    'Hold your device steady while staff scans the QR code.',
    'Wait for the green confirmation before stepping through.',
    'If the scan fails, staff can search using your Student ID printed below the code.',
  ];

  return (
    <>
      <PortalPageLayout
        title="My QR Code"
        subtitle="Personal check-in code — present to event staff"
      >
        <InfoBanner>
          <InfoSVG size={18} />
          This QR code is unique to your account and event. Do not share it — it is linked to your
          attendance record.
        </InfoBanner>

        {/* Event selector (shown when registered in multiple events).
            old: inline <div>/<label>/<select> with background:transparent + color:inherit.
            in dark mode this made option text white-on-white (unreadable).
            new: EventSelectWrap/Label/Select styled components with explicit inputBg +
            textPrimary so options are visible in both dark and light mode. */}
        {events.length > 1 && (
          <EventSelectWrap>
            <EventSelectLabel htmlFor="qr-event-select">
              Select event
            </EventSelectLabel>
            <EventSelect
              id="qr-event-select"
              value={selectedId}
              onChange={e => setSelectedId(e.target.value)}
            >
              <option value="">Choose an event...</option>
              {events.map(ev => (
                <option key={ev.id} value={ev.id}>{ev.title}</option>
              ))}
            </EventSelect>
          </EventSelectWrap>
        )}

        {qrError && (
          <InfoBanner style={{ borderColor: 'var(--error)', color: 'var(--error)' }}>
            <XCircleSVG size={16} />
            {qrError}
          </InfoBanner>
        )}

        <QRWrapper>
          {loadingQR
            ? <div style={{ padding: '4rem', color: 'var(--text-tertiary)', fontSize: '0.875rem' }}>Generating QR code...</div>
            : qrValue
              ? <QRDisplay user={user} qrValue={qrValue} size={220} />
              : !qrError && (
                events.length === 0
                  // No registered events — guide the user to the Browse & Register page
                  ? <div style={{ padding: '2rem', color: 'var(--text-tertiary)', fontSize: '0.875rem', textAlign: 'center', maxWidth: 360 }}>
                      You have not registered for any events yet.
                      <br />
                      Visit <strong>Browse &amp; Register</strong> to join an event first — your QR code will appear here once you are registered.
                    </div>
                  // Has events but none selected yet (only fires when length > 1)
                  : <div style={{ padding: '2rem', color: 'var(--text-tertiary)', fontSize: '0.875rem' }}>Select an event above to display your QR code.</div>
              )
          }

          {/* How-to instructions */}
          <Card style={{ maxWidth: '360px', width: '100%' }}>
            <CardHeader>
              <CardTitle style={{ fontSize: '0.95rem' }}>How to use</CardTitle>
            </CardHeader>
            <CardBody>
              <InstructionList>
                {instructions.map((text, i) => (
                  <InstructionItem key={i}>
                    <CheckCircleSVG size={16} style={{ color: 'var(--accent-primary, #3b82f6)' }} />
                    {text}
                  </InstructionItem>
                ))}
              </InstructionList>
            </CardBody>
          </Card>
        </QRWrapper>
      </PortalPageLayout>

      {/* Mobile sticky FAB — only shown when a QR is ready */}
      {qrValue && (
        <StickyQRButton onClick={() => setShowModal(true)} aria-label="Show QR code for check-in">
          <QrCodeSVG size={18} />
          Show QR Code
        </StickyQRButton>
      )}

      {/* Full-screen QR modal triggered by FAB on mobile */}
      {showModal && qrValue && (
        <QRModal role="dialog" aria-modal="true" aria-label="QR Code check-in">
          <QRModalInner>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
              <span style={{ fontWeight: 600, fontSize: '1rem' }}>Check-in QR</span>
              <button
                onClick={() => setShowModal(false)}
                aria-label="Close QR modal"
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'inherit', padding: '4px',
                }}
              >
                <CloseSVG size={20} />
              </button>
            </div>

            <QRDisplay user={user} qrValue={qrValue} size={200} />

            <ActionBtn onClick={() => setShowModal(false)} $variant="ghost" style={{ width: '100%' }}>
              Close
            </ActionBtn>
          </QRModalInner>
        </QRModal>
      )}
    </>
  );
};

export default MyQRCode;
