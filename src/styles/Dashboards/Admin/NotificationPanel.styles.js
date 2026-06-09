// src/styles/Dashboards/Admin/NotificationPanel.styles.js
// styles for the admin/organizer notification fly-out panel.
// the panel is a fixed-positioned popover that drops from the bell button in the
// sticky header. apple hig: card bg + border + subtle shadow so it reads as a
// distinct layer above the page content. all values come from theme tokens.

import styled, { keyframes } from 'styled-components';

// entry animation
const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// click-catcher overlay (transparent)
// covers the whole viewport so a tap/click anywhere outside closes the panel
export const PanelOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 490;
`;

// popover shell
// fixed so it always sits just below the header regardless of scroll position
export const PanelContainer = styled.div`
  position: fixed;
  top: 62px;          /* clears the 60px sticky header + 2px border */
  right: 16px;
  z-index: 500;
  width: clamp(300px, 90vw, 380px);
  max-height: min(520px, calc(100vh - 80px));
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.colors.shadowLg};
  animation: ${slideDown} 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
`;

// panel header row
export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  flex-shrink: 0;
  gap: 8px;
`;

export const PanelTitle = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.h6};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  flex: 1;
`;

// unread count pill next to the title
export const UnreadBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  background: ${({ theme }) => theme.colors.accentPrimary};
  color: ${({ theme }) => theme.colors.textOnAccent};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  flex-shrink: 0;
`;

// "mark all read" text button
export const MarkAllBtn = styled.button`
  background: none;
  border: none;
  padding: 4px 8px;
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.accentPrimary};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-family: inherit;
  flex-shrink: 0;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.bgTertiary};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

// scrollable list area
export const PanelScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.borderColor};
    border-radius: 2px;
  }
`;

// individual notification card
export const NotificationCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  background: ${({ $unread, theme }) =>
    $unread ? theme.colors.bgTertiary : 'transparent'};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border-left: 3px solid ${({ $urgency, theme }) => {
    switch ($urgency) {
      case 'high': return theme.colors.error;
      case 'medium': return theme.colors.warning;
      default: return theme.colors.info;
    }
  }};
  transition: background ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.bgHover};
  }
`;

// icon chip — tinted background based on notification type
export const NotificationIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  flex-shrink: 0;
  background: ${({ $type, theme }) => {
    const map = {
      approval: `${theme.colors.success}22`,
      alert: `${theme.colors.warning}22`,
      report: `${theme.colors.info}22`,
    };
    return map[$type] ?? `${theme.colors.accentPrimary}18`;
  }};
  color: ${({ $type, theme }) => {
    const map = {
      approval: theme.colors.success,
      alert: theme.colors.warning,
      report: theme.colors.info,
    };
    return map[$type] ?? theme.colors.accentPrimary;
  }};
`;

// text column
export const NotificationContent = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const NotificationTitle = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  font-weight: ${({ $unread, theme }) =>
    $unread ? theme.fontWeights.semibold : theme.fontWeights.regular};
  color: ${({ theme }) => theme.colors.textPrimary};
  line-height: 1.4;
`;

export const NotificationMessage = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
  /* allow two lines, then truncate */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const NotificationTime = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  color: ${({ theme }) => theme.colors.textTertiary};
`;

// unread dot on individual card
export const UnreadDot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.accentPrimary};
  flex-shrink: 0;
  margin-top: 6px;
`;

// empty / loading states
export const PanelEmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 40px 16px;
  text-align: center;

  svg {
    color: ${({ theme }) => theme.colors.textTertiary};
    opacity: 0.5;
  }

  p {
    margin: 0;
    font-size: ${({ theme }) => theme.fontSizes.bodySm};
    color: ${({ theme }) => theme.colors.textTertiary};
  }
`;
