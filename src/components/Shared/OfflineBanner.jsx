// src/components/Shared/OfflineBanner.jsx
// Bottom-fixed network status banner.
// Shows when navigator.onLine === false; auto-dismisses on reconnect.
// Does not render anything while the user is online.
import { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { WifiOffSVG } from '../SVGs';

// animation

const slideUp = keyframes`
  from { transform: translateY(100%); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
`;

const slideDown = keyframes`
  from { transform: translateY(0);    opacity: 1; }
  to   { transform: translateY(100%); opacity: 0; }
`;

// styled components

const Banner = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;

  display: flex;
  align-items: center;
  gap: 10px;

  padding: 12px 20px;
  background: ${({ theme }) => theme.colors.error};
  color: #fff;
  font-size: 0.825rem;
  font-weight: 500;
  box-shadow: ${({ theme }) => theme.colors.shadowLg};

  animation: ${({ $leaving }) =>
    $leaving
      ? css`${slideDown} 0.3s ease-in forwards`
      : css`${slideUp}   0.3s ease-out forwards`};
`;

const Message = styled.span`
  flex: 1;
`;

// component

const OfflineBanner = () => {
  // true when user is offline, false when online
  const [offline,  setOffline]  = useState(() => !navigator.onLine);
  // true during the slide-out animation so the element stays mounted long enough
  const [leaving,  setLeaving]  = useState(false);
  // visible = offline OR leaving (still animating out)
  const [visible,  setVisible]  = useState(() => !navigator.onLine);

  useEffect(() => {
    const handleOffline = () => {
      setOffline(true);
      setLeaving(false);
      setVisible(true);
    };

    const handleOnline = () => {
      setOffline(false);
      setLeaving(true);
      // remove the element after the slide-down animation completes (300ms)
      setTimeout(() => {
        setLeaving(false);
        setVisible(false);
      }, 320);
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online',  handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online',  handleOnline);
    };
  }, []);

  if (!visible) return null;

  return (
    <Banner
      role="status"
      aria-live="polite"
      aria-label={offline ? 'No internet connection' : 'Internet connection restored'}
      $leaving={leaving}
    >
      <WifiOffSVG size={16} aria-hidden="true" />
      <Message>
        {offline
          ? 'No internet connection. Some features may be unavailable.'
          : 'Connection restored.'}
      </Message>
    </Banner>
  );
};

export default OfflineBanner;
