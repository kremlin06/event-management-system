// src/styles/Dashboards/Attendee/AttendanceHistory.styles.js
import styled from 'styled-components';

// Desktop: full table

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  /* Hide the table on very small screens — CardStack takes over */
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

export const Thead = styled.thead`
  border-bottom: 2px solid ${({ theme }) => theme.colors.borderColor};
`;

export const Th = styled.th`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  text-align: left;
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.textTertiary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
`;

export const Tbody = styled.tbody``;

export const Tr = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  transition: background 0.15s ease;

  &:last-child { border-bottom: none; }

  &:hover {
    background: ${({ theme }) => theme.colors.bgHover};
  }
`;

export const Td = styled.td`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  color: ${({ theme }) => theme.colors.textPrimary};
  vertical-align: middle;
`;

export const TdSecondary = styled(Td)`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

// Mobile: expandable card stack

export const CardStack = styled.div`
  display: none;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: flex;
  }
`;

export const HistoryCard = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const HistoryCardRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const HistoryCardLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  color: ${({ theme }) => theme.colors.textTertiary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

export const HistoryCardValue = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  color: ${({ theme }) => theme.colors.textPrimary};
  text-align: right;
`;

// Summary strip at top of page
export const SummaryStrip = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const SummaryChip = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  background: ${({ $color }) => $color}15;
  color: ${({ $color }) => $color};
  border: 1px solid ${({ $color }) => $color}30;
`;
