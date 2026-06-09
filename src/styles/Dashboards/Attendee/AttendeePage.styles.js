// src/styles/Dashboards/Attendee/AttendeePage.styles.js
// Shared styled components reused across all Attendee sub-pages.
// Import from this file instead of duplicating definitions in each page's own styles file.
import styled, { keyframes, css } from 'styled-components';

// Page animations

export const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0);    }
`;

export const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.5; }
`;

// Page shell — wraps Navbar + content + Footer

export const PageWrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bgPrimary};
  display: flex;
  flex-direction: column;
`;

// Content area — offset from the 64px fixed Navbar
export const PageContent = styled.main`
  flex: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.xl};
  animation: ${fadeUp} 0.3s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 80px ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.lg};
  }
`;

// Page header row — back button + title + optional action

export const PageHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const PageHeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  padding: 6px 10px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.bgHover};
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  /* minimum 44px touch target on mobile */
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    min-height: 44px;
  }
`;

export const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.h3};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
  letter-spacing: -0.3px;

  /* fluid typography — slightly smaller on mobile */
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: clamp(1.25rem, 5vw, ${({ theme }) => theme.fontSizes.h3});
  }
`;

export const PageSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.bodyMd};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSizes.bodySm};
  }
`;

export const PageHeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-shrink: 0;
`;

// Info / notice banner — matches the portal's InfoBanner

export const InfoBanner = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.infoBg};
  border: 1px solid ${({ theme }) => theme.colors.info}30;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  svg { flex-shrink: 0; margin-top: 2px; }
`;

// Status badge — Present / Late / Absent

// const STATUS_COLORS = {
//   Present: { bg: '#052e16', text: '#22c55e', border: '#22c55e30' },
//   Late: { bg: '#422006', text: '#f59e0b', border: '#f59e0b30' },
//   Absent: { bg: '#450a0a', text: '#ef4444', border: '#ef444430' },
// };
const STATUS_COLORS = {
  Present: { bg: '#052e16', text: '#22c55e' },
  Late: { bg: '#422006', text: '#f59e0b' },
  Absent: { bg: '#450a0a', text: '#ef4444' },
};

// const LIGHT_STATUS_COLORS = {
//   Present: { bg: '#d4edda', text: '#28a745', border: '#28a74530' },
//   Late: { bg: '#fff3cd', text: '#e67700', border: '#e6770030' },
//   Absent: { bg: '#f8d7da', text: '#dc3545', border: '#dc354530' },
// };
const LIGHT_STATUS_COLORS = {
  Present: { bg: '#d4edda', text: '#28a745'},
  Late: { bg: '#fff3cd', text: '#e67700' },
  Absent: { bg: '#f8d7da', text: '#dc3545' },
};

export const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  padding: 3px 10px;
  border-radius: ${({ theme }) => theme.borderRadius.full};

  ${({ $status, theme }) => {
    const colorMap = theme.mode === 'light' ? LIGHT_STATUS_COLORS : STATUS_COLORS;
    const c = colorMap[$status] || colorMap.Absent;
    return css`
      background: ${c.bg};
      color: ${c.text};
      // border: 1px solid ${c.border};
    `;
  }}
`;

// Card container used across multiple pages

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.colors.shadowSm};
  overflow: hidden;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  gap: ${({ theme }) => theme.spacing.md};
`;

export const CardTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.h5};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`;

export const CardBody = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

// Empty state

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};
  text-align: center;
  color: ${({ theme }) => theme.colors.textTertiary};
  gap: ${({ theme }) => theme.spacing.md};
`;

export const EmptyTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.bodyMd};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`;

export const EmptySubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  color: ${({ theme }) => theme.colors.textTertiary};
  margin: 0;
`;

// Generic action button (primary filled)

export const ActionBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: 10px 20px;
  background: ${({ $variant, theme }) =>
    $variant === 'ghost' ? 'transparent' : theme.colors.accentPrimary};
  color: ${({ $variant, theme }) =>
    $variant === 'ghost' ? theme.colors.accentPrimary : '#fff'};
  border: 1px solid ${({ theme }) => theme.colors.accentPrimary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.55 : 1)};
  transition: all 0.2s ease-in-out;
  min-height: 44px; /* accessibility touch target */

  &:hover:not(:disabled) {
    background: ${({ $variant, theme }) =>
      $variant === 'ghost' ? theme.colors.accentPrimary + '15' : theme.colors.accentHover};
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

// Loading skeleton

export const Skeleton = styled.div`
  background: ${({ theme }) => theme.colors.bgTertiary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  height: ${({ $h }) => $h || '16px'};
  width: ${({ $w }) => $w || '100%'};
  animation: ${pulse} 1.5s ease-in-out infinite;
`;
