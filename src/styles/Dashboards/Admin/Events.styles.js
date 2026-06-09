// src/styles/Dashboards/Admin/Events.styles.js
// Phase 7 rebuild — Master-Detail layout replacing old flat table
// left panel: scrollable event list | right panel: event detail + sessions

import styled, { keyframes, css } from 'styled-components';

// Animations
const skeletonShimmer = keyframes`
  0%   { background-position: -600px 0; }
  100% { background-position: 600px 0; }
`;

const fadeSlideIn = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// reusable skeleton shimmer mixin
const skeletonMixin = css`
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.bgTertiary} 25%,
    ${({ theme }) => theme.colors.bgSecondary ?? theme.colors.bgTertiary} 50%,
    ${({ theme }) => theme.colors.bgTertiary} 75%
  );
  background-size: 800px 100%;
  animation: ${skeletonShimmer} 1.5s ease-in-out infinite;
`;

// reusable form control base styles
const formControlBase = css`
  padding: 9px 12px;
  background: ${({ theme }) => theme.colors.bgTertiary};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  font-family: inherit;
  transition: ${({ theme }) => theme.transitions.fast};
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accentPrimary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.infoBg};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textTertiary};
  }
`;

// Master-Detail Container
// fills the available vertical space inside DashboardContent
export const EventsMasterDetail = styled.div`
  display: flex;
  height: calc(100vh - 220px);
  min-height: 500px;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.cardBg};
  animation: ${fadeSlideIn} 0.2s ease-out;

  @media (max-width: 768px) {
    height: auto;
    min-height: calc(100vh - 200px);
    flex-direction: column;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
  }
`;

// Left Panel — Event List
export const EventsListPanel = styled.aside`
  width: 320px;
  flex-shrink: 0;
  border-right: 1px solid ${({ theme }) => theme.colors.borderColor};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.bgSecondary ?? theme.colors.bgPrimary};

  @media (max-width: 768px) {
    width: 100%;
    /* on mobile, hide the list when the detail panel is open */
    display: ${({ $mobileDetailOpen }) => $mobileDetailOpen ? 'none' : 'flex'};
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
    max-height: calc(100vh - 200px);
  }
`;

export const ListPanelTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 14px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  flex-shrink: 0;
`;

export const ListPanelTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;

  svg {
    color: ${({ theme }) => theme.colors.accentPrimary};
    flex-shrink: 0;
  }
`;

export const ListCount = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  background: ${({ theme }) => theme.colors.accentPrimary};
  color: #fff;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 10px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: 1;
`;

export const PanelCreateBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  background: ${({ theme }) => theme.colors.accentPrimary};
  color: #fff;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  flex-shrink: 0;
  white-space: nowrap;

  &:hover {
    background: ${({ theme }) => theme.colors.accentSecondary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accentPrimary};
    outline-offset: 2px;
  }
`;

export const ListSearchBar = styled.div`
  position: relative;
  padding: 12px 16px 6px;
  flex-shrink: 0;

  /* search icon */
  > svg:first-child {
    position: absolute;
    left: 28px;
    top: 50%;
    transform: translateY(-35%);
    color: ${({ theme }) => theme.colors.textTertiary};
    pointer-events: none;
    z-index: 1;
  }
`;

export const ListSearchInput = styled.input`
  width: 100%;
  padding: 8px 34px 8px 36px;
  background: ${({ theme }) => theme.colors.bgPrimary};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  font-family: inherit;
  transition: ${({ theme }) => theme.transitions.fast};
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accentPrimary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.infoBg};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textTertiary};
  }
`;

export const ClearSearchBtn = styled.button`
  position: absolute;
  right: 28px;
  top: 50%;
  transform: translateY(-35%);
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textTertiary};
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 2px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: ${({ theme }) => theme.transitions.fast};
  z-index: 1;

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const ListFilterRow = styled.div`
  padding: 6px 16px 10px;
  flex-shrink: 0;
`;

export const ListFilterSelect = styled.select`
  width: 100%;
  padding: 7px 10px;
  background: ${({ theme }) => theme.colors.bgPrimary};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  font-family: inherit;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accentPrimary};
  }
`;

export const EventsListScroll = styled.div`
  flex: 1;
  overflow-y: auto;
  overscroll-behavior: contain;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.borderColor};
    border-radius: 2px;
  }
`;

// loading skeleton for list items
export const EventListSkeleton = styled.div`
  height: 70px;
  margin: 4px 10px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  ${skeletonMixin}
`;

export const ListEmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 48px 16px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textTertiary};

  svg {
    opacity: 0.35;
    margin-bottom: 4px;
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes.bodySm};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    color: ${({ theme }) => theme.colors.textSecondary};
    margin: 0;
  }

  span {
    font-size: ${({ theme }) => theme.fontSizes.bodyXs};
    margin: 0;
  }
`;

// single event row in the left panel
export const EventListItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 12px 16px;
  cursor: pointer;
  border-left: 3px solid transparent;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  transition: ${({ theme }) => theme.transitions.fast};
  user-select: none;

  ${({ $active, theme }) => $active && css`
    border-left-color: ${theme.colors.accentPrimary};
    background: ${theme.colors.bgHover ?? theme.colors.bgTertiary};
  `}

  &:hover {
    background: ${({ theme }) => theme.colors.bgHover ?? theme.colors.bgTertiary};
  }

  &:last-child {
    border-bottom: none;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accentPrimary};
    outline-offset: -2px;
  }
`;

export const ELIName = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ELIStatusRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const ELIDate = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  color: ${({ theme }) => theme.colors.textTertiary};

  svg { flex-shrink: 0; }
`;

// status pill for list items — uses $status prop to determine color
export const ELIBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 10px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  white-space: nowrap;
  flex-shrink: 0;
  background: ${({ $status, theme }) => {
    switch ($status) {
      case 'Upcoming': return theme.colors.successBg;
      case 'Ongoing': return theme.colors.warningBg;
      case 'Completed': return theme.colors.infoBg;
      case 'Cancelled': return theme.colors.errorBg;
      default: return theme.colors.bgTertiary;  // Draft
    }
  }};
  color: ${({ $status, theme }) => {
    switch ($status) {
      case 'Upcoming': return theme.colors.success;
      case 'Ongoing': return theme.colors.warning;
      case 'Completed': return theme.colors.info;
      case 'Cancelled': return theme.colors.error;
      default: return theme.colors.textSecondary;
    }
  }};
`;

export const ELIVenue = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  color: ${({ theme }) => theme.colors.textTertiary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  svg { flex-shrink: 0; }
`;

// Right Panel — Event Detail
export const EventsDetailPanel = styled.main`
  flex: 1;
  min-width: 0;
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.bgPrimary};
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.borderColor};
    border-radius: 3px;
  }

  @media (max-width: 768px) {
    /* on mobile, hide the detail when the list is showing */
    display: ${({ $mobileDetailOpen }) => $mobileDetailOpen ? 'flex' : 'none'};
    min-height: calc(100vh - 200px);
  }
`;

// shown when no event is selected (desktop)
export const EmptySelection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  height: 100%;
  min-height: 400px;
  text-align: center;
  padding: 40px;
  color: ${({ theme }) => theme.colors.textTertiary};

  svg {
    opacity: 0.25;
    margin-bottom: 4px;
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSizes.h4};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    color: ${({ theme }) => theme.colors.textSecondary};
    margin: 0;
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes.bodySm};
    color: ${({ theme }) => theme.colors.textTertiary};
    max-width: 260px;
    line-height: 1.6;
    margin: 0;
  }
`;

// scrollable inner area of the detail panel
export const DetailScrollArea = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;

  @media (max-width: 768px) {
    padding: 16px;
    gap: 16px;
  }
`;

// back button — only visible on mobile to return to the list
export const MobileBackBtn = styled.button`
  display: none;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.accentPrimary};
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  padding: 0;
  margin-bottom: 4px;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover { opacity: 0.75; }

  @media (max-width: 768px) {
    display: flex;
  }
`;

// glassmorphism card for event metadata
export const DetailEventCard = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  padding: 24px;
  background: ${({ theme }) => theme.colors.cardBg};
  display: flex;
  flex-direction: column;
  gap: 20px;
  animation: ${fadeSlideIn} 0.2s ease-out;

  @supports (backdrop-filter: blur(1px)) {
    backdrop-filter: blur(12px);
    background: ${({ theme }) => theme.mode === 'dark'
      ? 'rgba(255,255,255,0.04)'
      : 'rgba(255,255,255,0.75)'};
  }

  @media (max-width: 768px) {
    padding: 16px;
    gap: 16px;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
  }
`;

export const DetailCardTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;

export const DetailEventTitle = styled.h2`
  font-size: clamp(1.1rem, 2vw, 1.4rem);
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
  line-height: 1.3;
`;

// large status badge in the detail card — matches ELIBadge color logic
export const DetailStatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 14px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  white-space: nowrap;
  flex-shrink: 0;
  background: ${({ $status, theme }) => {
    switch ($status) {
      case 'Upcoming': return theme.colors.successBg;
      case 'Ongoing': return theme.colors.warningBg;
      case 'Completed': return theme.colors.infoBg;
      case 'Cancelled': return theme.colors.errorBg;
      default: return theme.colors.bgTertiary;
    }
  }};
  color: ${({ $status, theme }) => {
    switch ($status) {
      case 'Upcoming': return theme.colors.success;
      case 'Ongoing': return theme.colors.warning;
      case 'Completed': return theme.colors.info;
      case 'Cancelled': return theme.colors.error;
      default: return theme.colors.textSecondary;
    }
  }};
`;

// 2-column grid of metadata items
export const DetailMeta = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const DetailMetaItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;

  svg {
    color: ${({ theme }) => theme.colors.accentPrimary};
    flex-shrink: 0;
    margin-top: 2px;
  }
`;

export const DetailMetaLabel = styled.div`
  font-size: 10px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.textTertiary};
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 2px;
`;

export const DetailMetaValue = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const DetailDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.65;
  margin: 0;
  padding-top: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
`;

export const DetailActions = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

// edit / delete action buttons inside the detail card
export const DetailActionBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  border: 1px solid;

  ${({ $variant, theme }) => $variant === 'edit' ? css`
    background: ${theme.colors.accentPrimary};
    color: #fff;
    border-color: ${theme.colors.accentPrimary};
    &:hover { background: ${theme.colors.accentSecondary}; border-color: ${theme.colors.accentSecondary}; }
  ` : css`
    background: transparent;
    color: ${theme.colors.error};
    border-color: ${theme.colors.error};
    &:hover { background: ${theme.colors.errorBg}; }
  `}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accentPrimary};
    outline-offset: 2px;
  }
`;

// Sessions Section
export const SessionsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SessionsSectionTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
  padding-bottom: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};

  svg { color: ${({ theme }) => theme.colors.accentPrimary}; }

  span {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 20px;
    height: 20px;
    padding: 0 6px;
    background: ${({ theme }) => theme.colors.bgTertiary};
    border-radius: ${({ theme }) => theme.borderRadius.full};
    font-size: 10px;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-left: auto;
  }
`;

export const SessionSkeleton = styled.div`
  height: 78px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  ${skeletonMixin}
`;

export const SessionEmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 32px 16px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textTertiary};

  svg { opacity: 0.3; }

  p {
    font-size: ${({ theme }) => theme.fontSizes.bodySm};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    color: ${({ theme }) => theme.colors.textSecondary};
    margin: 0;
  }

  span {
    font-size: ${({ theme }) => theme.fontSizes.bodyXs};
    max-width: 240px;
  }
`;

export const SessionCard = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  padding: 14px 16px;
  background: ${({ theme }) => theme.colors.cardBg};
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.accentPrimary};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.accentPrimary}22;
  }
`;

export const SessionCardTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const SessionCardMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const SessionMetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  color: ${({ theme }) => theme.colors.textSecondary};

  svg {
    color: ${({ theme }) => theme.colors.textTertiary};
    flex-shrink: 0;
  }
`;

// Modal Overlay (shared backdrop)
export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.62);
  z-index: 200;
  animation: ${fadeSlideIn} 0.15s ease-out;

  @supports (backdrop-filter: blur(1px)) {
    backdrop-filter: blur(4px);
  }
`;

// Edit Event Modal
export const ModalCard = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(560px, calc(100vw - 32px));
  max-height: calc(100vh - 64px);
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  z-index: 201;
  animation: ${fadeSlideIn} 0.18s ease-out;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb { background: ${({ theme }) => theme.colors.borderColor}; border-radius: 2px; }
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
`;

export const ModalTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${({ theme }) => theme.fontSizes.h4};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;

  svg { color: ${({ theme }) => theme.colors.accentPrimary}; }
`;

export const ModalCloseBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textTertiary};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: ${({ theme }) => theme.transitions.fast};
  flex-shrink: 0;

  &:hover {
    background: ${({ theme }) => theme.colors.bgHover ?? theme.colors.bgTertiary};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const ModalBody = styled.div`
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FormError = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: ${({ theme }) => theme.colors.errorBg};
  border: 1px solid ${({ theme }) => theme.colors.error}40;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSizes.bodySm};

  svg { flex-shrink: 0; }
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const FormLabel = styled.label`
  font-size: 10px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

export const FormInput    = styled.input`${formControlBase}`;
export const FormSelect   = styled.select`${formControlBase} cursor: pointer;`;
export const FormTextarea = styled.textarea`
  ${formControlBase}
  resize: vertical;
  min-height: 80px;
`;

export const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  padding: 16px 24px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
  flex-wrap: wrap;
`;

export const ModalCancelBtn = styled.button`
  padding: 8px 18px;
  background: ${({ theme }) => theme.colors.bgTertiary};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover { background: ${({ theme }) => theme.colors.bgHover ?? theme.colors.borderColor}; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

export const ModalSubmitBtn = styled.button`
  padding: 8px 18px;
  background: ${({ theme }) => theme.colors.accentPrimary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: #fff;
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover { background: ${({ theme }) => theme.colors.accentSecondary}; }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

// Delete Confirm Modal
export const ConfirmModalCard = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(420px, calc(100vw - 32px));
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  z-index: 201;
  padding: 32px 28px 24px;
  text-align: center;
  animation: ${fadeSlideIn} 0.18s ease-out;
`;

export const ConfirmIconArea = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.errorBg};
  color: ${({ theme }) => theme.colors.error};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
`;

export const ConfirmTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.h4};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0 0 10px;
`;

export const ConfirmMessage = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  margin: 0 0 20px;

  strong { color: ${({ theme }) => theme.colors.textPrimary}; }
`;

export const ConfirmActions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
`;

export const ConfirmDeleteBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 20px;
  background: ${({ theme }) => theme.colors.error};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: #fff;
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover { opacity: 0.88; }
  &:disabled { opacity: 0.55; cursor: not-allowed; }
`;

// old flat-table layout components — kept for reference, no longer imported
/*
export const EventsContainer = ...  (old full-page wrapper)
export const PageHeader = ...       (old h1 + create button header)
export const CreateButton = ...     (old blue create button)
export const ControlsBar = ...      (old search + filter row)
export const SearchBox = ...
export const SearchInput = ...
export const FilterSelect = ...
export const TableContainer = ...
export const Table = ...
export const EventName = ...
export const StatusBadge = ...      (old status badge — logic moved to ELIBadge / DetailStatusBadge)
export const ActionMenu = ...
export const ActionButton = ...
export const DropdownMenu = ...
export const DropdownItem = ...
export const Pagination = ...
export const PaginationInfo = ...
export const PaginationButtons = ...
export const PageButton = ...
export const EmptyState = ...
*/
