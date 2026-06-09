// src/styles/Dashboards/Attendee/MyQRCode.styles.js
import styled, { keyframes } from 'styled-components';
import SelectChevronWrap from '../../../components/Shared/SelectChevronWrap';

const scanLine = keyframes`
  0%   { top: 4px;   opacity: 1; }
  90%  { top: calc(100% - 4px); opacity: 1; }
  100% { top: calc(100% - 4px); opacity: 0; }
`;

// Centered layout wrapper
export const QRWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.xl} 0;
`;

// Card that frames the QR code
export const QRCard = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.colors.shadowLg};
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: 360px;
  width: 100%;
`;

export const QRLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  color: ${({ theme }) => theme.colors.textTertiary};
  text-align: center;
  margin: 0;
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
`;

// Container for the QR SVG itself — adds corner brackets
export const QRFrame = styled.div`
  position: relative;
  padding: 12px;
  background: #ffffff;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.colors.shadowSm};

  /* Animated scan line */
  &::after {
    content: '';
    position: absolute;
    left: 12px;
    right: 12px;
    height: 2px;
    background: ${({ theme }) => theme.colors.accentPrimary};
    border-radius: 1px;
    animation: ${scanLine} 2.5s ease-in-out infinite;
    opacity: 0;
  }
`;

// Corner decoration brackets
export const CornerBracket = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  border-color: ${({ theme }) => theme.colors.accentPrimary};
  border-style: solid;
  ${({ $pos }) => {
    switch ($pos) {
      case 'tl': return 'top: 0; left: 0; border-width: 3px 0 0 3px; border-radius: 4px 0 0 0;';
      case 'tr': return 'top: 0; right: 0; border-width: 3px 3px 0 0; border-radius: 0 4px 0 0;';
      case 'bl': return 'bottom: 0; left: 0; border-width: 0 0 3px 3px; border-radius: 0 0 0 4px;';
      case 'br': return 'bottom: 0; right: 0; border-width: 0 3px 3px 0; border-radius: 0 0 4px 0;';
      default: return '';
    }
  }}
`;

// Student info below QR
export const StudentInfo = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const StudentName = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.h5};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`;

export const StudentId = styled.code`
  font-size: ${({ theme }) => theme.fontSizes.bodyMd};
  font-family: ${({ theme }) => theme.fonts.mono};
  color: ${({ theme }) => theme.colors.accentPrimary};
  background: ${({ theme }) => theme.colors.accentPrimary}15;
  border: 1px solid ${({ theme }) => theme.colors.accentPrimary}30;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 4px 12px;
  letter-spacing: 0.05em;
`;

export const FallbackNote = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  color: ${({ theme }) => theme.colors.textTertiary};
  text-align: center;
  margin: 0;
`;

// Usage instructions list
export const InstructionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  max-width: 360px;
  width: 100%;
`;

export const InstructionItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};

  svg { flex-shrink: 0; margin-top: 2px; }
`;

// Mobile sticky FAB — fixed at bottom, visible only on small screens
export const StickyQRButton = styled.button`
  display: none;
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 200;
  padding: 14px 32px;
  background: ${({ theme }) => theme.colors.accentPrimary};
  color: #fff;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.bodyMd};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.colors.shadowLg};
  transition: all 0.2s ease;
  min-height: 52px;
  white-space: nowrap;

  &:hover {
    background: ${({ theme }) => theme.colors.accentHover};
    transform: translateX(-50%) translateY(-2px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

// QR modal overlay for mobile FAB flow
export const QRModal = styled.div`
  position: fixed;
  inset: 0;
  z-index: 300;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

export const QRModalInner = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: 320px;
  width: 100%;
`;

// Event selector (shown when registered in more than one event)
// old: inline <div> + <label> + <select> with `background: transparent` and
//      `color: inherit`. in dark mode the <option> elements are rendered by the
//      browser with a white background while the text is white (inherited from
//      the dark theme) → white text on white = invisible.
// fix: explicit inputBg + textPrimary on both the select AND its options so the
//      dropdown is readable in every theme. styled-components injects these as
//      real CSS so the browser uses them even for the native option list.

// styled(SelectChevronWrap) extends the React component with layout CSS.
// SelectChevronWrap handles all the chevron state (open/close) internally.
export const EventSelectWrap = styled(SelectChevronWrap)`
  width: 100%;
  max-width: 400px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const EventSelectLabel = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 6px;
`;

export const EventSelect = styled.select`
  width: 100%;
  padding: 8px 32px 8px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.inputBorder};
  /* explicit background + color — NOT transparent/inherit.
     native <option> elements inherit these so they are readable in dark mode. */
  background-color: ${({ theme }) => theme.colors.inputBg};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  font-family: ${({ theme }) => theme.fonts.primary};
  appearance: none;
  /* custom chevron arrow tinted to textTertiary */
  /* old: background-image svg arrow — removed because EventSelectWrap::after
     now handles the animated chevron via selectChevronMixin. */
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.inputFocus};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.inputFocus}20`};
  }

  /* explicit option styling — critical for dark mode. without this the browser
     paints options with OS-default white background + inherited white text. */
  option {
    background-color: ${({ theme }) => theme.colors.inputBg};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;
