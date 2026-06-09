import { useEffect } from 'react';
import { CheckCircleSVG, XCircleSVG } from '../SVGs';
import * as S from '../../styles/Staff/StaffDashboard.styles';

/**
 * Full-screen flash overlay shown after a QR scan attempt.
 * Renders via a portal-like fixed position overlay (no portal needed — z-index 9999).
 * Auto-dismisses after `duration` ms.
 *
 * Props:
 *   result: 'success' | 'error' | null  — null = hidden
 *   message: string
 *   onDone: () => void  — called when the animation completes
 *   duration: number (ms, default 800)
 */
const ScanOverlay = ({ result, message, onDone, duration = 800 }) => {
  useEffect(() => {
    if (!result) return;
    const t = setTimeout(onDone, duration);
    return () => clearTimeout(t);
  }, [result, duration, onDone]);

  if (!result) return null;

  return (
    <S.Overlay $result={result} role="status" aria-live="assertive" aria-atomic="true">
      <S.OverlayIcon $result={result}>
        {result === 'success'
          ? <CheckCircleSVG size={36} />
          : <XCircleSVG size={36} />}
      </S.OverlayIcon>
      <S.OverlayMessage $result={result}>{message}</S.OverlayMessage>
    </S.Overlay>
  );
};

export default ScanOverlay;
