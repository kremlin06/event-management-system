// src/styles/Dashboards/Admin/AdminDashboard.styles.js
// Layout styles for the Admin/Organizer Dashboard overhaul (Phase 3)
// Desktop sidebar ≥1440px | hamburger drawer ≤414px | responsive metric grid
import styled, { keyframes, css } from 'styled-components';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const pulseRing = keyframes`
  0%   { transform: scale(1);    opacity: 1; }
  70%  { transform: scale(1.6);  opacity: 0; }
  100% { transform: scale(1.6);  opacity: 0; }
`;

const slideIn = keyframes`
  from { transform: translateX(-100%); }
  to   { transform: translateX(0); }
`;

// Top-level shell
export const DashboardShell = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bgPrimary};
  position: relative;
`;

// Fixed sidebar (≥1440px only)
export const Sidebar = styled.aside`
  width: 240px;
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.bgSecondary};
  border-right: 1px solid ${({ theme }) => theme.colors.borderColor};
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 200;
  overflow-y: auto;

  /* Hidden below 1440px — hamburger drawer takes over */
  @media (max-width: 1439px) {
    display: none;
  }
`;

export const SidebarBrand = styled.div`
  padding: 20px 16px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};

  .brand-name {
    font-size: ${({ theme }) => theme.fontSizes.bodySm};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    color: ${({ theme }) => theme.colors.textPrimary};
    letter-spacing: 0.02em;
  }

  .brand-sub {
    font-size: ${({ theme }) => theme.fontSizes.bodyXs};
    color: ${({ theme }) => theme.colors.textTertiary};
    margin-top: 2px;
  }
`;

export const SidebarNav = styled.nav`
  flex: 1;
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const SidebarNavItem = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 9px 12px;
  border: none;
  background: ${({ $active, theme }) =>
    $active ? `${theme.colors.accentPrimary}18` : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.accentPrimary : theme.colors.textSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  font-weight: ${({ $active, theme }) =>
    $active ? theme.fontWeights.semibold : theme.fontWeights.regular};
  text-align: left;
  transition: ${({ theme }) => theme.transitions.fast};
  font-family: inherit;
  min-height: 44px;

  &:hover {
    background: ${({ theme }) => theme.colors.bgHover};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const SidebarFooter = styled.div`
  padding: 12px 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};

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

export const SidebarLogoutBtn = styled.button`
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 12px;
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  font-family: inherit;

  &:hover {
    background: ${({ theme }) => theme.colors.errorBg};
    color: ${({ theme }) => theme.colors.error};
    border-color: ${({ theme }) => theme.colors.error};
  }
`;

// Mobile drawer
export const DrawerOverlay = styled.div`
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 300;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? 'all' : 'none')};
  transition: opacity 0.25s ease;

  /* old: max-width: 414px — this left iPhones between 415px–1439px (e.g. iPhone 14
     Pro Max at 430px) with no backdrop when the drawer was open. fixed to match the
     hamburger breakpoint so the overlay always appears when the drawer is usable. */
  @media (max-width: 1439px) {
    display: block;
  }
`;

export const MobileDrawer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100vh;
  background: ${({ theme }) => theme.colors.bgSecondary};
  border-right: 1px solid ${({ theme }) => theme.colors.borderColor};
  z-index: 400;
  transform: translateX(${({ $open }) => ($open ? '0' : '-100%')});
  transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const DrawerCloseBtn = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  background: none;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.bgHover};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

// Main content area
export const MainArea = styled.main`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;

  /* Push right when sidebar is visible */
  @media (min-width: 1440px) {
    margin-left: 240px;
  }
`;

// Sticky dashboard header
export const DashboardHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  background: ${({ theme }) => theme.colors.bgPrimary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  padding: 12px 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 60px;

  @media (max-width: 640px) {
    padding: 10px 16px;
  }
`;

export const HamburgerBtn = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  flex-shrink: 0;
  transition: ${({ theme }) => theme.transitions.fast};

  /* Only show on mobile */
  @media (max-width: 1439px) {
    display: flex;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.bgHover};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const HeaderTitle = styled.div`
  flex: 1;
  min-width: 0;

  .header-welcome {
    font-size: ${({ theme }) => theme.fontSizes.h4};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    color: ${({ theme }) => theme.colors.textPrimary};
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .header-sub {
    font-size: ${({ theme }) => theme.fontSizes.bodyXs};
    color: ${({ theme }) => theme.colors.textSecondary};
    margin: 0;
  }

  @media (max-width: 414px) {
    .header-sub { display: none; }
  }
`;

export const HeaderControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;

export const HeaderDateChip = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  background: ${({ theme }) => theme.colors.bgTertiary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  color: ${({ theme }) => theme.colors.textSecondary};
  white-space: nowrap;

  @media (max-width: 640px) {
    display: none;
  }
`;

export const IconBtn = styled.button`
  position: relative;
  width: 38px;
  height: 38px;
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.bgHover};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const NotifDot = styled.span`
  position: absolute;
  top: 6px;
  right: 6px;
  width: 8px;
  height: 8px;
  background: ${({ theme }) => theme.colors.error};
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.bgPrimary};

  &::after {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.error};
    animation: ${pulseRing} 1.8s ease-out infinite;
  }
`;

// Page content
export const DashboardContent = styled.div`
  flex: 1;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  animation: ${fadeUp} 0.3s ease;

  @media (max-width: 640px) {
    padding: 16px;
    gap: 16px;
  }
`;

// 4-column MetricGrid
export const MetricGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 414px) {
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
`;

// Shared card shell
export const SectionCard = styled.section`
  background: ${({ theme }) => theme.colors.cardBg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.colors.shadowSm};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  overflow: hidden;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};

  @media (max-width: 640px) {
    padding: 14px 16px;
    flex-wrap: wrap;
    gap: 8px;
  }
`;

export const CardTitle = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.h5};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CardSubtitle = styled.p`
  margin: 2px 0 0;
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  color: ${({ theme }) => theme.colors.textTertiary};
`;

export const CardBody = styled.div`
  padding: 20px;

  @media (max-width: 640px) {
    padding: 16px;
  }
`;

// Bar chart scroll wrapper (horizontal scroll on mobile)
export const ChartScrollWrapper = styled.div`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 4px;

  /* Custom scrollbar */
  &::-webkit-scrollbar { height: 4px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.borderColor};
    border-radius: 2px;
  }
`;

export const ChartInner = styled.div`
  min-width: 600px;
  padding: 16px 20px;
`;

// Pagination controls
export const PaginationRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
  gap: 12px;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    padding: 10px 16px;
    justify-content: center;
  }
`;

export const PaginationInfo = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  color: ${({ theme }) => theme.colors.textTertiary};

  @media (max-width: 414px) {
    display: none;
  }
`;

export const PaginationBtns = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const PageBtn = styled.button`
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  border: 1px solid ${({ $active, theme }) =>
    $active ? theme.colors.accentPrimary : theme.colors.borderColor};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.accentPrimary : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? '#fff' : theme.colors.textSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  transition: ${({ theme }) => theme.transitions.fast};
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
  font-family: inherit;

  &:hover:not(:disabled):not([aria-current="true"]) {
    background: ${({ theme }) => theme.colors.bgHover};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

// Floating Action Button
export const CreateFAB = styled.button`
  position: fixed;
  bottom: 28px;
  right: 28px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.accentPrimary};
  color: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.colors.shadowLg};
  z-index: 150;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;

  &:hover {
    transform: scale(1.1);
    background: ${({ theme }) => theme.colors.accentHover};
    box-shadow: ${({ theme }) => theme.colors.shadowXl};
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.accentPrimary};
    outline-offset: 4px;
  }

  @media (max-width: 414px) {
    bottom: 20px;
    right: 20px;
    width: 52px;
    height: 52px;
  }
`;

// Activity table
export const ActivityTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({ theme }) => theme.fontSizes.bodySm};

  @media (max-width: 640px) {
    display: none;
  }
`;

export const AThead = styled.thead`
  background: ${({ theme }) => theme.colors.bgTertiary};
`;

export const ATh = styled.th`
  padding: 10px 16px;
  text-align: left;
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.textTertiary};
  text-transform: uppercase;
  letter-spacing: 0.04em;
  white-space: nowrap;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
`;

export const ATbody = styled.tbody``;

export const ATr = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  transition: background ${({ theme }) => theme.transitions.fast};

  &:last-child { border-bottom: none; }

  &:hover {
    background: ${({ theme }) => theme.colors.bgTertiary};
  }
`;

export const ATd = styled.td`
  padding: 12px 16px;
  color: ${({ theme }) => theme.colors.textPrimary};
  vertical-align: middle;
`;

// Mobile card stack (shown only on mobile where table is hidden)
export const ActivityCardStack = styled.div`
  display: none;
  flex-direction: column;
  gap: 8px;
  padding: 12px 16px;

  @media (max-width: 640px) {
    display: flex;
  }
`;

export const ActivityMobileCard = styled.div`
  background: ${({ theme }) => theme.colors.bgTertiary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

// Source/status badge
const SOURCE_COLORS = {
  attendance: { bg: '#172554', text: '#60a5fa' },
  registration: { bg: '#052e16', text: '#22c55e' },
};
const STATUS_COLORS = {
  Present: { bg: '#052e16',  text: '#22c55e' },
  Late: { bg: '#422006',  text: '#f59e0b' },
  Absent: { bg: '#450a0a',  text: '#ef4444' },
  Confirmed: { bg: '#052e16',  text: '#22c55e' },
  Pending: { bg: '#1c1400',  text: '#facc15' },
  Cancelled: { bg: '#1c1c1c',  text: '#71717a' },
};

const LIGHT_SOURCE_COLORS = {
  attendance: { bg: '#dbeafe', text: '#1d4ed8' },
  registration: { bg: '#dcfce7', text: '#15803d' },
};
const LIGHT_STATUS_COLORS = {
  Present: { bg: '#dcfce7', text: '#15803d' },
  Late: { bg: '#fef3c7', text: '#b45309' },
  Absent: { bg: '#fee2e2', text: '#b91c1c' },
  Confirmed: { bg: '#dcfce7', text: '#15803d' },
  Pending: { bg: '#fef9c3', text: '#854d0e' },
  Cancelled: { bg: '#f3f4f6', text: '#6b7280' },
};

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  white-space: nowrap;

  ${({ $type, $variant, theme }) => {
    const isDark = theme.colors.bgPrimary === '#0a0a0a';
    if ($variant === 'source') {
      const c = isDark
        ? SOURCE_COLORS[$type]  || SOURCE_COLORS.attendance
        : LIGHT_SOURCE_COLORS[$type] || LIGHT_SOURCE_COLORS.attendance;
      return css`background: ${c.bg}; color: ${c.text};`;
    }
    const c = isDark
      ? STATUS_COLORS[$type]  || STATUS_COLORS.Confirmed
      : LIGHT_STATUS_COLORS[$type] || LIGHT_STATUS_COLORS.Confirmed;
    return css`background: ${c.bg}; color: ${c.text};`;
  }}
`;

// PII-masked cell
export const MaskedCell = styled.span`
  color: ${({ theme }) => theme.colors.textTertiary};
  font-style: italic;
  filter: blur(3px);
  user-select: none;
`;
