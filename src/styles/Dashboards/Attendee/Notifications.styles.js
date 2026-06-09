// src/styles/Dashboards/Attendee/Notifications.styles.js
import styled from 'styled-components';

export const NotifList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const NotifItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  background: ${({ $unread, theme }) =>
    $unread ? theme.colors.accentPrimary + '08' : 'transparent'};
  transition: background ${({ theme }) => theme.transitions.fast};
  /* unread items are clickable (clicking marks them as read) */
  cursor: ${({ $unread }) => $unread ? 'pointer' : 'default'};

  &:last-child { border-bottom: none; }

  &:hover {
    background: ${({ theme }) => theme.colors.bgHover};
  }
`;

/* badge pill next to the "Notifications" title — replaces the inline-styled span */
export const NotifUnreadBadge = styled.span`
  display: inline-flex;
  align-items: center;
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.accentPrimary};
  color: ${({ theme }) => theme.colors.textOnAccent};
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const NotifIconWrapper = styled.div`
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $color }) => $color}20;
  color: ${({ $color }) => $color};
  margin-top: 2px;
`;

export const NotifBody = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const NotifMessage = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  font-weight: ${({ $unread, theme }) =>
    $unread ? theme.fontWeights.medium : theme.fontWeights.regular};
`;

export const NotifTime = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  color: ${({ theme }) => theme.colors.textTertiary};
`;

export const UnreadDot = styled.span`
  flex-shrink: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.accentPrimary};
  margin-top: 7px;
`;
