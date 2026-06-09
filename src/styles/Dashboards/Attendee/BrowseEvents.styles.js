// src/styles/Dashboards/Attendee/BrowseEvents.styles.js
import styled from 'styled-components';

// Responsive event card grid — 3 cols → 2 → 1
export const EventGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const EventCard = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.colors.shadowSm};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accentPrimary};
    box-shadow: ${({ theme }) => theme.colors.shadowMd};
    transform: translateY(-2px);
  }
`;

// Coloured top border accent — uses the event's colour
export const CardAccentBar = styled.div`
  height: 4px;
  background: ${({ $color }) => $color || '#3b82f6'};
`;

export const CardInner = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  flex: 1;
`;

export const EventTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.h5};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: clamp(0.9rem, 4vw, ${({ theme }) => theme.fontSizes.h5});
  }
`;

export const EventDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  margin: 0;
  /* Clamp to 3 lines */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const EventMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  color: ${({ theme }) => theme.colors.textTertiary};

  svg { flex-shrink: 0; }
`;

export const CardFooter = styled.div`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const CapacityBar = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const CapacityLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  color: ${({ theme }) => theme.colors.textTertiary};
`;

export const CapacityTrack = styled.div`
  height: 4px;
  background: ${({ theme }) => theme.colors.bgTertiary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  overflow: hidden;
`;

export const CapacityFill = styled.div`
  height: 100%;
  width: ${({ $pct }) => Math.min($pct, 100)}%;
  background: ${({ $pct, theme }) =>
    $pct >= 100 ? theme.colors.error :
    $pct >= 80  ? theme.colors.warning :
    theme.colors.accentPrimary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  transition: width 0.4s ease;
`;

export const StatusPill = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  padding: 3px 10px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  white-space: nowrap;
  background: ${({ $status, theme }) => {
    if ($status === 'Open')   return theme.mode === 'light' ? '#d4edda' : '#052e16';
    if ($status === 'Full')   return theme.mode === 'light' ? '#f8d7da' : '#450a0a';
    return theme.colors.bgTertiary;
  }};
  color: ${({ $status, theme }) => {
    if ($status === 'Open') return theme.mode === 'light' ? '#28a745' : '#22c55e';
    if ($status === 'Full') return theme.mode === 'light' ? '#dc3545' : '#ef4444';
    return theme.colors.textTertiary;
  }};
`;
