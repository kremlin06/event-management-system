// src/styles/Dashboards/Attendee/Schedule.styles.js
import styled, { keyframes, css } from 'styled-components';

const activePulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }
  50%       { box-shadow: 0 0 0 6px rgba(59, 130, 246, 0);  }
`;

// Vertical timeline container
export const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  position: relative;
`;

// Invisible connecting line that runs through all dots
export const TimelineLine = styled.div`
  position: absolute;
  left: 19px;
  top: 24px;
  bottom: 24px;
  width: 2px;
  background: ${({ theme }) => theme.colors.borderColor};
  z-index: 0;
`;

export const TimelineItem = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing.lg};
  position: relative;
  z-index: 1;
  opacity: ${({ $state }) => ($state === 'past' ? 0.5 : 1)};
  transition: opacity 0.2s ease;
`;

// Circle dot on the timeline
export const TimelineDot = styled.div`
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ $state, theme }) => {
    if ($state === 'active') return css`
      background: ${theme.colors.accentPrimary};
      color: #fff;
      animation: ${activePulse} 2s ease-in-out infinite;
    `;
    if ($state === 'past') return css`
      background: ${theme.colors.bgTertiary};
      color: ${theme.colors.textTertiary};
      border: 2px solid ${theme.colors.borderColor};
    `;
    return css`
      background: ${theme.colors.bgTertiary};
      color: ${theme.colors.textSecondary};
      border: 2px solid ${theme.colors.borderColor};
    `;
  }}
`;

export const TimelineCard = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.colors.cardBg};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: 1px solid ${({ $state, theme }) =>
    $state === 'active' ? theme.colors.accentPrimary : theme.colors.borderColor};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ $state, theme }) =>
    $state === 'active' ? theme.colors.shadowMd : theme.colors.shadowSm};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accentPrimary};
    box-shadow: ${({ theme }) => theme.colors.shadowMd};
  }
`;

export const ActiveLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.accentPrimary};
  background: ${({ theme }) => theme.colors.accentPrimary}15;
  border: 1px solid ${({ theme }) => theme.colors.accentPrimary}30;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  padding: 2px 8px;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const SessionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.h5};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: clamp(0.9rem, 4vw, ${({ theme }) => theme.fontSizes.h5});
  }
`;

export const EventName = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  color: ${({ theme }) => theme.colors.accentPrimary};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
`;

export const SessionMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const MetaItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  color: ${({ theme }) => theme.colors.textTertiary};

  svg { flex-shrink: 0; }
`;
