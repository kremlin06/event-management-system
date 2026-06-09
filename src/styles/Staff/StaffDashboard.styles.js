import styled, { keyframes, css } from 'styled-components';
import SelectChevronWrap from '../../components/Shared/SelectChevronWrap';

// new keyframes for Phase 6 components
const livePulse = keyframes`
  0%, 100% { opacity: 1;   transform: scale(1);    }
  50%       { opacity: 0.5; transform: scale(0.85); }
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(-6px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
`;

// Page shell
export const PageShell = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bgPrimary};
  display: flex;
  flex-direction: column;
`;

export const PageHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  background: ${({ theme }) => theme.colors.cardBg};
  flex-shrink: 0;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const PageHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const BackBtn = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.bgTertiary};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const PageTitle = styled.div`
  h1 {
    font-size: ${({ theme }) => theme.fontSizes.h5};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    color: ${({ theme }) => theme.colors.textPrimary};
    margin: 0;
  }
  p {
    font-size: ${({ theme }) => theme.fontSizes.bodyXs};
    color: ${({ theme }) => theme.colors.textTertiary};
    margin: 2px 0 0;
  }
`;

export const PageContent = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.xl};
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  animation: ${fadeUp} 0.2s ease;

  @media (max-width: 900px) {
    padding: ${({ theme }) => theme.spacing.md};
    /* leave room for the fixed BottomNav */
    padding-bottom: 76px;
  }
`;

// Session selector bar
// compact dark-grey pill matching the Apple HIG dropdown style in the blueprints.
export const SelectorBar = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: 10px ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.bgSecondary};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  flex-wrap: wrap;

  @supports (backdrop-filter: blur(1px)) {
    background: ${({ theme }) =>
      theme.mode === 'dark'
        ? 'rgba(17, 17, 17, 0.7)'
        : 'rgba(248, 249, 250, 0.7)'};
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }

  label {
    font-size: ${({ theme }) => theme.fontSizes.bodyXs};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    color: ${({ theme }) => theme.colors.textTertiary};
    white-space: nowrap;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const SelectorSelectWrap = styled(SelectChevronWrap)`
  flex: 1;
  min-width: 160px;
`;

export const SelectorSelect = styled.select`
  width: 100%;  /* old: flex:1 min-width:160px — now lives on SelectorSelectWrap */
  background: ${({ theme }) => theme.colors.inputBg};
  border: 1px solid ${({ theme }) => theme.colors.inputBorder};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 7px 32px 7px 10px;
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.fonts.primary};
  cursor: pointer;
  appearance: none;
  /* old: background-image svg arrow — removed, SelectorSelectWrap::after handles it */
  transition: ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.inputFocus};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.inputFocus}20`};
  }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

// Two-pane layout
export const TwoPaneLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

// $mobileHide — when true the pane is display:none on narrow screens.
// this powers the Scan / Roster mobile bottom-nav tabs.
export const Pane = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: 900px) {
    display: ${({ $mobileHide }) => ($mobileHide ? 'none' : 'flex')};
  }
`;

// Card
// glassmorphism: semi-transparent bg + backdrop-blur + ultra-thin border.
// @supports guard means it degrades gracefully to a solid card in older browsers.
export const Card = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  transition: box-shadow ${({ theme }) => theme.transitions.fast};

  @supports (backdrop-filter: blur(1px)) {
    background: ${({ theme }) =>
      theme.mode === 'dark'
        ? 'rgba(17, 17, 17, 0.82)'
        : 'rgba(255, 255, 255, 0.82)'};
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-color: ${({ theme }) =>
      theme.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.07)'
        : 'rgba(0, 0, 0, 0.07)'};
  }

  &:hover {
    box-shadow: ${({ theme }) => theme.colors.shadowSm};
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  gap: ${({ theme }) => theme.spacing.sm};

  h2 {
    font-size: ${({ theme }) => theme.fontSizes.bodyMd};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    color: ${({ theme }) => theme.colors.textPrimary};
    margin: 0;
  }
`;

export const CardBody = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

// QR Scanner
export const ScannerContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  max-width: 360px;
  margin: 0 auto;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.bgTertiary};
`;

export const ScannerViewfinder = styled.div`
  width: 100%;
  height: 100%;
  /* html5-qrcode mounts its video element here */
  #qr-reader { width: 100% !important; height: 100% !important; border: none !important; }
  #qr-reader video { width: 100% !important; height: 100% !important; object-fit: cover; }
  #qr-reader__scan_region { border: none !important; }
  #qr-reader__dashboard { display: none !important; }
`;

export const ScannerGuide = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const GuideBox = styled.div`
  width: 55%;
  aspect-ratio: 1;
  position: relative;

  &::before, &::after,
  span::before, span::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border-color: ${({ theme }) => theme.colors.accentPrimary};
    border-style: solid;
  }
  /* top-left */
  &::before { top: 0; left: 0; border-width: 3px 0 0 3px; border-radius: 3px 0 0 0; }
  /* top-right */
  &::after  { top: 0; right: 0; border-width: 3px 3px 0 0; border-radius: 0 3px 0 0; }
  span::before { bottom: 0; left: 0; border-width: 0 0 3px 3px; border-radius: 0 0 0 3px; }
  span::after  { bottom: 0; right: 0; border-width: 0 3px 3px 0; border-radius: 0 0 3px 0; }
`;

export const PermissionError = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.bodySm};

  svg { opacity: 0.6; }
`;

export const ScannerControls = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

export const ScanBtn = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: 8px 18px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-family: ${({ theme }) => theme.fonts.primary};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  border: none;
  background: ${({ $variant, theme }) =>
    $variant === 'stop' ? theme.colors.errorBg : theme.colors.accentPrimary};
  color: ${({ $variant, theme }) =>
    $variant === 'stop' ? theme.colors.error : '#fff'};

  &:hover:not(:disabled) {
    opacity: 0.88;
  }
  &:disabled { opacity: 0.4; cursor: not-allowed; }
`;

// Scan overlay (full-screen flash)
export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  background: ${({ $result, theme }) =>
    $result === 'success'
      ? `${theme.colors.success}22`
      : `${theme.colors.error}22`};
  animation: ${({ $result }) => css`${$result === 'success' ? flashSuccess : flashError} 0.5s ease forwards`};
`;

const flashSuccess = keyframes`
  0%   { opacity: 0; }
  20%  { opacity: 1; }
  80%  { opacity: 1; }
  100% { opacity: 0; }
`;

const flashError = keyframes`
  0%        { opacity: 0; transform: translateX(0); }
  10%       { opacity: 1; transform: translateX(-6px); }
  20%, 40%, 60%, 80% { transform: translateX(6px); }
  30%, 50%, 70%      { transform: translateX(-6px); }
  100%      { opacity: 0; transform: translateX(0); }
`;

export const OverlayIcon = styled.div`
  width: 72px;
  height: 72px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ $result, theme }) =>
    $result === 'success' ? theme.colors.success : theme.colors.error};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;

export const OverlayMessage = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.bodyMd};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ $result, theme }) =>
    $result === 'success' ? theme.colors.success : theme.colors.error};
  margin: 0;
  text-align: center;
  padding: 0 ${({ theme }) => theme.spacing.xl};
`;

// Live feed
export const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  max-height: 420px;
  overflow-y: auto;
`;

export const FeedEntry = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  animation: ${slideIn} 0.2s ease;

  &:last-child { border-bottom: none; }
`;

export const FeedEntryInfo = styled.div`
  flex: 1;
  min-width: 0;

  p { margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .name { font-size: ${({ theme }) => theme.fontSizes.bodySm}; font-weight: ${({ theme }) => theme.fontWeights.medium}; color: ${({ theme }) => theme.colors.textPrimary}; }
  .meta { font-size: ${({ theme }) => theme.fontSizes.bodyXs}; color: ${({ theme }) => theme.colors.textTertiary}; }
`;

export const FeedTime = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  color: ${({ theme }) => theme.colors.textTertiary};
  white-space: nowrap;
  flex-shrink: 0;
`;

export const FeedEmpty = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  color: ${({ theme }) => theme.colors.textTertiary};
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
`;

export const ReconnectBanner = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.warningBg};
  color: ${({ theme }) => theme.colors.warning};
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

// Manual override / attendee picker
export const SearchInput = styled.input`
  width: 100%;
  background: ${({ theme }) => theme.colors.inputBg};
  border: 1px solid ${({ theme }) => theme.colors.inputBorder};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 8px 12px;
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.fonts.primary};

  &::placeholder { color: ${({ theme }) => theme.colors.textTertiary}; }
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.inputFocus};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.inputFocus}20`};
  }
`;

export const AttendeeList = styled.div`
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

export const AttendeeRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  background: ${({ $selected, theme }) => $selected ? theme.colors.bgSecondary : 'transparent'};

  &:last-child { border-bottom: none; }
  &:hover { background: ${({ theme }) => theme.colors.bgSecondary}; }
`;

export const AttendeeInfo = styled.div`
  flex: 1;
  min-width: 0;
  .name { font-size: ${({ theme }) => theme.fontSizes.bodySm}; font-weight: ${({ theme }) => theme.fontWeights.medium}; color: ${({ theme }) => theme.colors.textPrimary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .id   { font-size: ${({ theme }) => theme.fontSizes.bodyXs}; color: ${({ theme }) => theme.colors.textTertiary}; }
`;

export const StatusSelectWrap = styled(SelectChevronWrap)`
  flex-shrink: 0;
  /* shift the small chevron inward slightly for the compact status select */
  &::after { right: 8px; width: 6px; height: 6px; }
`;

export const StatusSelect = styled.select`
  width: 100%;  /* old: flex-shrink:0 was here — moved to StatusSelectWrap */
  padding: 6px 24px 6px 10px;
  background: ${({ theme }) => theme.colors.inputBg};
  border: 1px solid ${({ theme }) => theme.colors.inputBorder};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.textPrimary};
  appearance: none;
  cursor: pointer;
  /* old: background-image svg arrow — removed, StatusSelectWrap::after handles it */
  transition: ${({ theme }) => theme.transitions.fast};

  &:focus { outline: none; border-color: ${({ theme }) => theme.colors.inputFocus}; }
  &:disabled { opacity: 0.4; cursor: not-allowed; }
`;

export const SaveBtn = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: 7px 16px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-family: ${({ theme }) => theme.fonts.primary};
  cursor: pointer;
  border: none;
  background: ${({ theme }) => theme.colors.accentPrimary};
  color: #fff;
  transition: ${({ theme }) => theme.transitions.fast};
  flex-shrink: 0;

  &:hover:not(:disabled) { background: ${({ theme }) => theme.colors.accentHover}; }
  &:disabled { opacity: 0.4; cursor: not-allowed; }
`;

// Session info card
export const SessionMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const MetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xs} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};

  &:last-child { border-bottom: none; }

  span:first-child {
    font-size: ${({ theme }) => theme.fontSizes.bodyXs};
    color: ${({ theme }) => theme.colors.textTertiary};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }
  span:last-child {
    font-size: ${({ theme }) => theme.fontSizes.bodySm};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

// Phase 6 additions

// Right side of the page header — contains ThemeToggle and notification bell
export const PageHeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-left: auto;
`;

// Icon-only button used for the notification bell in the header
export const HeaderIconBtn = styled.button`
  width: 38px;
  height: 38px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  background: ${({ theme }) => theme.colors.bgSecondary};
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  flex-shrink: 0;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.bgHover};
    color: ${({ theme }) => theme.colors.textPrimary};
    border-color: ${({ theme }) => theme.colors.borderDark};
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accentPrimary};
    outline-offset: 2px;
  }
  &:focus:not(:focus-visible) { outline: none; }
`;

// Small pulsing "Live" indicator badge shown inside the session info card header
export const LiveBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.successBg};
  color: ${({ theme }) => theme.colors.success};
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  letter-spacing: 0.03em;

  /* the pulsing dot */
  &::before {
    content: '';
    display: block;
    width: 6px;
    height: 6px;
    border-radius: ${({ theme }) => theme.borderRadius.full};
    background: ${({ theme }) => theme.colors.success};
    animation: ${livePulse} 1.4s ease-in-out infinite;
  }
`;

// Sticky banner below the selector bar that shows present count / total roster size.
// old: border-radius and border were applied via inline style on the element — moved here.
export const PresentCountBar = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.successBg};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.success};
  flex-shrink: 0;

  .count  { font-weight: ${({ theme }) => theme.fontWeights.bold}; font-size: ${({ theme }) => theme.fontSizes.bodyMd}; }
  .sep    { color: ${({ theme }) => theme.colors.textTertiary}; font-weight: 400; }
  .label  { color: ${({ theme }) => theme.colors.textSecondary}; font-weight: 400; }
`;

// Fixed bottom navigation shown only on narrow screens (≤900px mobile breakpoint)
export const BottomNav = styled.nav`
  display: none;

  @media (max-width: 900px) {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 200;
    background: ${({ theme }) => theme.colors.cardBg};
    border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
    height: 60px;
    /* respect the iOS home bar */
    padding-bottom: env(safe-area-inset-bottom, 0);
  }
`;

export const BottomNavBtn = styled.button`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  background: none;
  border: none;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 0.65rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  letter-spacing: 0.03em;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.accentPrimary : theme.colors.textTertiary};
  transition: ${({ theme }) => theme.transitions.fast};
  padding: 0 ${({ theme }) => theme.spacing.sm};

  svg {
    color: ${({ $active, theme }) =>
      $active ? theme.colors.accentPrimary : theme.colors.textTertiary};
  }

  &:active { opacity: 0.7; }
`;

// Inline edit row appended inside a FeedEntry when the staff clicks on it (US-13)
export const FeedEntryEditRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.bgSecondary};
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
  animation: ${slideIn} 0.15s ease;
`;

// small confirm/cancel buttons used in FeedEntryEditRow
// StaffHome page

// full-height centered body for the staff home/landing page
export const HomeBody = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
  animation: ${fadeUp} 0.25s ease;
`;

export const HomeCard = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: clamp(2rem, 5vw, 3.5rem);
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.colors.shadowMd};
  text-align: center;
`;

export const HomeAvatar = styled.div`
  width: 72px;
  height: 72px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.accentPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.75rem;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  flex-shrink: 0;
`;

export const HomeWelcome = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.h4};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`;

export const HomeRoleBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 14px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.infoBg};
  color: ${({ theme }) => theme.colors.info};
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  letter-spacing: 0.04em;
`;

export const HomeDivider = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
  margin: 0;
`;

export const HomeStartBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  width: 100%;
  padding: 14px 24px;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: none;
  background: ${({ theme }) => theme.colors.accentPrimary};
  color: #fff;
  font-size: ${({ theme }) => theme.fontSizes.bodyMd};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-family: ${({ theme }) => theme.fonts.primary};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  letter-spacing: 0.01em;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.accentHover};
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.colors.shadowMd};
  }
  &:active { transform: translateY(0); }
`;

// logout button — ghost-danger style so it's visible but not alarming
export const HomeLogoutBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 16px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  background: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-family: ${({ theme }) => theme.fonts.primary};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.error};
    color: ${({ theme }) => theme.colors.error};
    background: ${({ theme }) => theme.colors.errorBg};
  }
`;

export const EditActionBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 5px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-family: ${({ theme }) => theme.fonts.primary};
  cursor: pointer;
  border: none;
  transition: ${({ theme }) => theme.transitions.fast};
  background: ${({ $variant, theme }) =>
    $variant === 'cancel'
      ? theme.colors.bgTertiary
      : theme.colors.accentPrimary};
  color: ${({ $variant, theme }) =>
    $variant === 'cancel' ? theme.colors.textSecondary : '#fff'};

  &:hover:not(:disabled) { opacity: 0.85; }
  &:disabled { opacity: 0.45; cursor: not-allowed; }
`;

// Unified Staff layout — persistent sidebar (≥1024px) + drawer (≤1023px)
// shared by StaffDashboard, the scanner, notifications and history pages so a
// staff user can jump between every staff page from one place.
// breakpoint: 1024px (sidebar collapses to a slide-in drawer + bottom nav).

const SIDEBAR_W = '240px';

// outermost wrapper — fills the viewport, hosts sidebar + main column
export const LayoutShell = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bgPrimary};
`;

// fixed sidebar — visible from 1024px up, hidden below (drawer takes over).
// glassmorphism treatment to match the frosted header.
export const LayoutSidebar = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: ${SIDEBAR_W};
  background: ${({ theme }) => theme.colors.cardBg};
  border-right: 1px solid ${({ theme }) => theme.colors.borderColor};
  display: flex;
  flex-direction: column;
  z-index: 150;

  @supports (backdrop-filter: blur(1px)) {
    background: ${({ theme }) =>
      theme.mode === 'dark'
        ? 'rgba(10, 10, 10, 0.88)'
        : 'rgba(255, 255, 255, 0.88)'};
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-right-color: ${({ theme }) =>
      theme.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.06)'
        : 'rgba(0, 0, 0, 0.06)'};
  }

  @media (max-width: 1023px) {
    display: none;
  }
`;

// brand block at the top of the sidebar.
// text-only version — the icon was removed per Phase 6 polish request.
// .brand-mark CSS kept as dead code for ref; the element is not rendered.
export const SidebarBrand = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  flex-shrink: 0;

  /* old: icon container — element removed, rules kept for reference */
  .brand-mark {
    width: 34px;
    height: 34px;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    background: ${({ theme }) => theme.colors.accentPrimary};
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .brand-name {
    /* old: accentPrimary (blue) — made the Staff brand text a different colour
       from the Admin sidebar which uses textPrimary. inconsistent.
       new: textPrimary so both sidebars read the same. */
    font-size: ${({ theme }) => theme.fontSizes.bodySm};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    color: ${({ theme }) => theme.colors.textPrimary};
    line-height: 1.1;
    letter-spacing: 0.02em;
  }
  .brand-sub {
    font-size: ${({ theme }) => theme.fontSizes.bodyXs};
    color: ${({ theme }) => theme.colors.textTertiary};
    margin-top: 2px;
    letter-spacing: 0.02em;
  }
`;

// scrollable nav list
export const SidebarNav = styled.nav`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.sm};
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

// a single nav row — $active highlights the current page
export const SidebarNavItem = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  width: 100%;
  text-align: left;
  padding: 10px 12px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  background: ${({ $active, theme }) =>
    $active ? `${theme.colors.accentPrimary}18` : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.accentPrimary : theme.colors.textSecondary};

  svg { flex-shrink: 0; }

  &:hover {
    background: ${({ $active, theme }) =>
      $active ? `${theme.colors.accentPrimary}18` : theme.colors.bgTertiary};
    color: ${({ $active, theme }) =>
      $active ? theme.colors.accentPrimary : theme.colors.textPrimary};
  }

  /* small unread count pill pushed to the right (notifications row) */
  .nav-badge {
    margin-left: auto;
    min-width: 18px;
    height: 18px;
    padding: 0 5px;
    border-radius: ${({ theme }) => theme.borderRadius.full};
    background: ${({ theme }) => theme.colors.accentPrimary};
    color: #fff;
    font-size: 0.65rem;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
`;

// footer block with the signed-in user + logout.
// old: had a blue avatar circle, a .user-row flex wrapper, and avatar/name/role
//      in a horizontal layout. that made it visually different from the Admin sidebar.
// new: matches AdminDashboard.styles.js SidebarFooter exactly —
//      padding 12px 16px, user-name, user-role, then the logout button below.
export const SidebarUser = styled.div`
  padding: 12px 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
  flex-shrink: 0;

  .user-name {
    font-size: ${({ theme }) => theme.fontSizes.bodySm};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    color: ${({ theme }) => theme.colors.textPrimary};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .user-role {
    font-size: ${({ theme }) => theme.fontSizes.bodyXs};
    color: ${({ theme }) => theme.colors.textTertiary};
  }
`;

// old: padding 9px 14px, bodySm font, centered text with LogOutSVG icon, gap 6px.
// new: matches AdminDashboard.styles.js SidebarLogoutBtn exactly —
//      margin-top 8px, padding 8px 12px, bodyXs font, no icon, left-aligned.
export const SidebarLogout = styled.button`
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  background: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-family: ${({ theme }) => theme.fonts.primary};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.errorBg};
    color: ${({ theme }) => theme.colors.error};
    border-color: ${({ theme }) => theme.colors.error};
  }
`;

// Mobile drawer (≤1023px)

// dimmed backdrop behind the drawer
export const DrawerOverlay = styled.div`
  display: none;

  @media (max-width: 1023px) {
    display: ${({ $open }) => ($open ? 'block' : 'none')};
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    z-index: 250;
    animation: ${fadeUp} 0.15s ease;
  }
`;

// the slide-in drawer itself — reuses the sidebar's inner blocks
export const MobileDrawer = styled.aside`
  display: none;

  @media (max-width: 1023px) {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: min(82vw, 300px);
    background: ${({ theme }) => theme.colors.cardBg};
    border-right: 1px solid ${({ theme }) => theme.colors.borderColor};
    z-index: 260;
    transform: translateX(${({ $open }) => ($open ? '0' : '-100%')});
    transition: transform 0.25s ease;
    box-shadow: ${({ theme }) => theme.colors.shadowLg};
  }
`;

export const DrawerClose = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: none;
  background: ${({ theme }) => theme.colors.bgTertiary};
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover { color: ${({ theme }) => theme.colors.textPrimary}; }
`;

// Main column (right of the sidebar)

export const LayoutMain = styled.div`
  margin-left: ${SIDEBAR_W};
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  @media (max-width: 1023px) {
    margin-left: 0;
  }
`;

// sticky header on top of the main column — glassmorphism so page content
// scrolls "underneath" the frosted bar rather than abruptly disappearing
export const LayoutHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.cardBg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};

  @supports (backdrop-filter: blur(1px)) {
    background: ${({ theme }) =>
      theme.mode === 'dark'
        ? 'rgba(10, 10, 10, 0.8)'
        : 'rgba(255, 255, 255, 0.8)'};
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-bottom-color: ${({ theme }) =>
      theme.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.06)'
        : 'rgba(0, 0, 0, 0.06)'};
  }

  @media (max-width: 640px) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

// hamburger — only shown when the sidebar is collapsed (≤1023px)
export const Hamburger = styled.button`
  display: none;

  @media (max-width: 1023px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    border: 1px solid ${({ theme }) => theme.colors.borderColor};
    background: ${({ theme }) => theme.colors.bgSecondary};
    color: ${({ theme }) => theme.colors.textSecondary};
    cursor: pointer;
    flex-shrink: 0;
    transition: ${({ theme }) => theme.transitions.fast};

    &:hover {
      color: ${({ theme }) => theme.colors.textPrimary};
      background: ${({ theme }) => theme.colors.bgHover};
    }
  }
`;

export const LayoutTitleBlock = styled.div`
  min-width: 0;
  flex: 1;

  h1 {
    /* fluid: 1rem on 320px → 1.125rem on 1280px — never clips on narrow headers */
    font-size: clamp(1rem, 1.5vw + 0.5rem, 1.125rem);
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    color: ${({ theme }) => theme.colors.textPrimary};
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  p {
    font-size: clamp(0.7rem, 1vw + 0.2rem, 0.75rem);
    color: ${({ theme }) => theme.colors.textTertiary};
    margin: 2px 0 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const LayoutHeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-left: auto;
`;

export const LayoutContent = styled.main`
  flex: 1;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
  animation: ${fadeUp} 0.2s ease;

  @media (max-width: 900px) {
    padding: ${({ theme }) => theme.spacing.md};
    /* leave room for the fixed BottomNav on mobile */
    padding-bottom: 76px;
  }
`;

// Notification list (staff notifications page + header dropdown)

export const NotifList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NotifItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  background: ${({ $unread, theme }) =>
    $unread ? `${theme.colors.accentPrimary}0a` : 'transparent'};

  &:last-child { border-bottom: none; }
`;

export const NotifIconWrapper = styled.div`
  width: 34px;
  height: 34px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: ${({ $color }) => $color || '#3b82f6'};
  background: ${({ $color }) => `${$color || '#3b82f6'}1a`};
`;

export const NotifBody = styled.div`
  flex: 1;
  min-width: 0;
`;

export const NotifTitle = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  font-weight: ${({ $unread, theme }) =>
    $unread ? theme.fontWeights.semibold : theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const NotifMessage = styled.p`
  margin: 2px 0 0;
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
`;

export const NotifTime = styled.span`
  display: block;
  margin-top: 4px;
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  color: ${({ theme }) => theme.colors.textTertiary};
`;

export const UnreadDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.accentPrimary};
  flex-shrink: 0;
  margin-top: 6px;
`;

// small red count badge sitting on the header bell icon
export const BellBadge = styled.span`
  position: absolute;
  top: -2px;
  right: -2px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.error};
  color: #fff;
  font-size: 0.6rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${({ theme }) => theme.colors.cardBg};
`;

// "Mark all as read" ghost button used on the notifications page header
export const MarkReadBtn = styled.button`
  padding: 6px 14px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  background: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-family: ${({ theme }) => theme.fonts.primary};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.textPrimary};
    background: ${({ theme }) => theme.colors.bgTertiary};
  }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

// Session stat mini-cards (shown above the two-pane layout when a session is active)
// mirrors the Admin MetricGrid pattern — 3 KPI tiles: Checked-In / Expected / Rate.

export const SessionStatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  animation: ${fadeUp} 0.25s ease;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const SessionStatCard = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 18px;
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-top: 3px solid ${({ $color }) => $color || '#3b82f6'};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.colors.shadowSm};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    box-shadow: ${({ theme }) => theme.colors.shadowMd};
    transform: translateY(-1px);
  }
`;

export const SessionStatIcon = styled.div`
  width: 42px;
  height: 42px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: ${({ $color }) => `${$color || '#3b82f6'}18`};
  color: ${({ $color }) => $color || '#3b82f6'};
`;

export const SessionStatBody = styled.div`
  min-width: 0;
  flex: 1;
`;

export const SessionStatValue = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.h4};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  line-height: 1.1;
  letter-spacing: -0.02em;
`;

export const SessionStatLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 3px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

// Capacity utilisation bar (inside Session Context card)
export const CapacityBarWrap = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
  padding-top: ${({ theme }) => theme.spacing.sm};
`;

export const CapacityBarTrack = styled.div`
  height: 6px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.bgTertiary};
  overflow: hidden;
  margin-top: 6px;
`;

export const CapacityBarFill = styled.div`
  height: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ $pct, theme }) =>
    $pct >= 85 ? theme.colors.success
    : $pct >= 50 ? theme.colors.accentPrimary
    : theme.colors.warning};
  width: ${({ $pct }) => `${Math.min($pct, 100)}%`};
  transition: width 0.6s ease;
`;

export const CapacityBarLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  color: ${({ theme }) => theme.colors.textTertiary};
`;

// Page-level empty state (no session selected)
// more welcoming than the old FeedEmpty used for page-level states
export const EmptyStatePage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: clamp(3rem, 8vw, 5rem) ${({ theme }) => theme.spacing.xl};
  text-align: center;
  animation: ${fadeUp} 0.3s ease;
`;

export const EmptyStateIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  background: ${({ theme }) => theme.colors.bgTertiary};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textTertiary};
`;

export const EmptyStateTitle = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.h5};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const EmptyStateSub = styled.p`
  margin: 0;
  max-width: 360px;
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.65;
`;

// Search field wrapper for history page
// replaces inline position:relative wrapper + absolute icon from StaffAttendanceHistory
export const SearchWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  svg {
    position: absolute;
    left: 10px;
    color: ${({ theme }) => theme.colors.textTertiary};
    pointer-events: none;
  }
`;

export const SearchInputPadded = styled(SearchInput)`
  padding-left: 32px;
  width: clamp(160px, 30vw, 260px);
`;

// Notification unread count badge (StaffNotifications header)
// replaces the inline-styled span
export const NotifUnreadBadge = styled.span`
  margin-left: 8px;
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.accentPrimary};
  color: ${({ theme }) => theme.colors.textOnAccent};
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

// Attendance history table

export const HistoryTableWrap = styled.div`
  overflow-x: auto;
`;

export const HistoryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({ theme }) => theme.fontSizes.bodySm};

  thead th {
    text-align: left;
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.fontSizes.bodyXs};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    color: ${({ theme }) => theme.colors.textTertiary};
    text-transform: uppercase;
    letter-spacing: 0.04em;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
    white-space: nowrap;
  }

  tbody td {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
    color: ${({ theme }) => theme.colors.textPrimary};
    white-space: nowrap;
  }

  tbody tr:last-child td { border-bottom: none; }
  tbody tr:hover { background: ${({ theme }) => theme.colors.bgSecondary}; }
`;

// colored status pill used in the history table + live feed (Present/Late/Absent)
export const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  background: ${({ $status, theme }) =>
    $status === 'Present' ? theme.colors.successBg
    : $status === 'Late'  ? theme.colors.warningBg
    : $status === 'Absent' ? theme.colors.errorBg
    : theme.colors.bgTertiary};
  color: ${({ $status, theme }) =>
    $status === 'Present' ? theme.colors.success
    : $status === 'Late'  ? theme.colors.warning
    : $status === 'Absent' ? theme.colors.error
    : theme.colors.textSecondary};
`;
