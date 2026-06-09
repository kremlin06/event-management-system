// src/styles/Dashboards/Attendee/AttendeePortal.styles.js
import styled, { keyframes } from 'styled-components';

// fade-up entrance animation — matches the admin Dashboard.styles.js pattern
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0);    }
`;

// Page shell — accounts for the fixed 64px Navbar at the top
export const PortalPageWrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bgPrimary};
`;

export const PortalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  /* 80px = fixed navbar (64px) + 16px breathing room */
  padding: 80px ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.xl};
  animation: ${fadeUp} 0.3s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 80px ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.lg};
  }
`;

// Welcome header row
export const WelcomeHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const WelcomeLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const WelcomeTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.h2};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
  letter-spacing: -0.5px;
`;

export const WelcomeSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.bodyMd};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`;

// Pill badge showing today's date — mirrors Dashboard date-chip
export const DateChip = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.bgTertiary};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  white-space: nowrap;
  align-self: flex-start;
`;

// Info / notice banner
export const InfoBanner = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.infoBg};
  border: 1px solid ${({ theme }) => theme.colors.info}30;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
`;

// Portal section with label + card grid
export const PortalSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const SectionLabel = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.h5};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`;

// 3-column grid, collapses to 2 then 1 on smaller screens
export const PortalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

// Individual portal action card — button so it's keyboard-accessible
export const PortalCard = styled.button`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.colors.shadowSm};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  text-align: left;
  width: 100%;
  opacity: ${({ $disabled }) => ($disabled ? '0.55' : '1')};
  transition: all 0.2s ease-in-out;

  &:hover:not([disabled]) {
    background: ${({ theme }) => theme.colors.cardHover};
    border-color: ${({ $accentColor }) => $accentColor || '#3b82f6'};
    box-shadow: ${({ theme }) => theme.colors.shadowMd};
    transform: translateY(-2px);
  }

  &:active:not([disabled]) {
    transform: translateY(0);
    box-shadow: ${({ theme }) => theme.colors.shadowSm};
  }

  /* focus ring for keyboard accessibility */
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accentPrimary};
    outline-offset: 2px;
  }
`;

// Coloured icon container — tinted background at 10% opacity
export const CardIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  /* $color is the hex accent, 1a = ~10% opacity */
  background: ${({ $color }) => $color || '#3b82f6'}1a;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: ${({ $color }) => $color || '#3b82f6'};
  flex-shrink: 0;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  flex: 1;
  min-width: 0;
`;

export const CardLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.h5};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const CardDescription = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  color: ${({ theme }) => theme.colors.textTertiary};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
`;

// Small pill shown on disabled (Phase 2) cards
export const DisabledBadge = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textDisabled};
  background: ${({ theme }) => theme.colors.bgTertiary};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  padding: 2px 10px;
  align-self: flex-start;
`;
