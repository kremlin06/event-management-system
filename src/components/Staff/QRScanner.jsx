import { useState, useEffect, useRef, useCallback } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { scanQR } from '../../services/attendance';
import ScanOverlay from './ScanOverlay';
import { CameraSVG, XCircleSVG } from '../SVGs';
import * as S from '../../styles/Staff/StaffDashboard.styles';

const DEBOUNCE_MS    = 3000; // ignore re-scans of the same code within 3 s
const SCANNER_DIV_ID = 'qr-reader';

// web audio api beep — progressive enhancement, silent on unsupported browsers.
// success: high-pitched short tone (880 hz).
// error: low-pitched double blip (300 hz) to sound distinct from success.
const playBeep = (isSuccess) => {
  try {
    // AudioContext must be created inside a user-gesture handler (scan callback satisfies this)
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sine';

    if (isSuccess) {
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.25);
    } else {
      // two short blips at a lower frequency
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.25);
      // second blip
      const osc2  = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(300, ctx.currentTime + 0.15);
      gain2.gain.setValueAtTime(0.08, ctx.currentTime + 0.15);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.30);
      osc2.start(ctx.currentTime + 0.15);
      osc2.stop(ctx.currentTime + 0.35);
    }
  } catch { /* AudioContext not available — fail silently */ }
};

const QRScanner = ({ sessionId, onScanSuccess }) => {
  const [scanning,    setScanning]    = useState(false);
  const [overlay,     setOverlay]     = useState({ result: null, message: '' });
  const [permError,   setPermError]   = useState(null);

  const scannerRef    = useRef(null);
  const lastCodeRef   = useRef(null);
  const lastTimeRef   = useRef(0);

  // Start/stop scanner
  const startScanner = useCallback(async () => {
    if (scannerRef.current) return;
    setPermError(null);

    const html5Qrcode = new Html5Qrcode(SCANNER_DIV_ID);
    scannerRef.current = html5Qrcode;

    const onSuccess = async (decodedText) => {
      // Debounce — ignore if same code scanned within DEBOUNCE_MS
      const now = Date.now();
      if (decodedText === lastCodeRef.current && now - lastTimeRef.current < DEBOUNCE_MS) return;
      lastCodeRef.current = decodedText;
      lastTimeRef.current = now;

      try {
        const result = await scanQR({ sessionId, attendeeCode: decodedText });
        setOverlay({ result: 'success', message: result.message ?? `${result.fullName} — ${result.status}` });
        onScanSuccess?.(result);
        // haptic + audio feedback (both progressive enhancement — ignored if unsupported)
        navigator.vibrate?.(150);
        playBeep(true);
      } catch (err) {
        const msg = err.response?.data?.error?.message ?? 'Scan failed. Please try again.';
        setOverlay({ result: 'error', message: msg });
        navigator.vibrate?.([100, 50, 100]);
        playBeep(false);
      }
    };

    // Responsive scan box: 80% of the smaller viewfinder edge so the QR has a
    // large target area on any device (the old fixed 220×220 box was a tiny
    // square in the centre that made codes very hard to line up and read).
    const qrboxFn = (viewfinderWidth, viewfinderHeight) => {
      const minEdge = Math.min(viewfinderWidth, viewfinderHeight);
      const size = Math.max(200, Math.floor(minEdge * 0.8));
      return { width: size, height: size };
    };

    // Try the back camera first (best for scanning a code held by someone else),
    // then fall back to ANY available camera — laptops have no 'environment'
    // camera, so without this fallback the scanner silently fails to start there.
    const startWith = async (cameraConfig) =>
      html5Qrcode.start(
        cameraConfig,
        { fps: 15, qrbox: qrboxFn },
        onSuccess,
        // frame-decode error — suppress, not actionable
        () => {},
      );

    try {
      try {
        await startWith({ facingMode: 'environment' });
      } catch {
        // environment camera unavailable (e.g. laptop) — use the default camera
        await startWith({ facingMode: 'user' });
      }
      setScanning(true);
    } catch (err) {
      scannerRef.current = null;
      if (err?.name === 'NotAllowedError' || String(err).includes('permission')) {
        setPermError('Camera access was denied. Please allow camera permissions and try again.');
      } else {
        setPermError('Could not start camera. Make sure no other app is using it.');
      }
    }
  }, [sessionId, onScanSuccess]);

  const stopScanner = useCallback(async () => {
    if (!scannerRef.current) return;
    try {
      await scannerRef.current.stop();
      scannerRef.current.clear();
    } catch { /* already stopped */ }
    scannerRef.current = null;
    setScanning(false);
  }, []);

  // Stop scanner when sessionId changes or on unmount
  useEffect(() => {
    return () => { stopScanner(); };
  }, [stopScanner]);

  useEffect(() => {
    if (scanning) stopScanner();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  const clearOverlay = useCallback(() => setOverlay({ result: null, message: '' }), []);

  return (
    <>
      <ScanOverlay
        result={overlay.result}
        message={overlay.message}
        onDone={clearOverlay}
      />

      <S.ScannerContainer aria-label="QR code scanner viewfinder">
        <S.ScannerViewfinder>
          <div id={SCANNER_DIV_ID} />
        </S.ScannerViewfinder>

        {!scanning && !permError && (
          <S.ScannerGuide aria-hidden="true">
            <S.GuideBox><span /></S.GuideBox>
          </S.ScannerGuide>
        )}

        {permError && (
          <S.PermissionError role="alert">
            <XCircleSVG size={32} />
            <span>{permError}</span>
          </S.PermissionError>
        )}
      </S.ScannerContainer>

      <S.ScannerControls>
        {!scanning ? (
          <S.ScanBtn
            onClick={startScanner}
            disabled={!sessionId}
            aria-label="Start QR scanner"
          >
            <CameraSVG size={15} />
            Start Scanner
          </S.ScanBtn>
        ) : (
          <S.ScanBtn $variant="stop" onClick={stopScanner} aria-label="Stop QR scanner">
            <XCircleSVG size={15} />
            Stop Scanner
          </S.ScanBtn>
        )}
      </S.ScannerControls>
    </>
  );
};

export default QRScanner;
