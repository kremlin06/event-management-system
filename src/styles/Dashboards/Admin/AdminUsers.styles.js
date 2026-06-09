// src/styles/Dashboards/Admin/AdminUsers.styles.js
// styles for the admin user management page (/admin/users).
// apple hig: glassmorphism card for the create-account form, clean table for
// the user list. all text sizes use clamp() so the page reads well on mobile
// (414px) without any horizontal scrolling.

import styled from 'styled-components';
import SelectChevronWrap from '../../../components/Shared/SelectChevronWrap';

// the outer wrapper that pads the page content and animates in
export const PageContent = styled.div`
  flex: 1;
  padding: clamp(16px, 4vw, 28px);
  display: flex;
  flex-direction: column;
  gap: clamp(16px, 3vw, 24px);
  max-width: 1120px;
  width: 100%;
  margin: 0 auto;
`;

// two-column layout on desktop, single column on narrow screens.
// left: the create-account form card
// right: the user list table card
// on screens narrower than 900px we stack them vertically
export const TwoColLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 420px) 1fr;
  gap: clamp(16px, 3vw, 24px);
  align-items: flex-start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

// the glassmorphism form card — frosted glass style sits on top of the
// page background. backdrop-filter: blur() creates the frosted look.
// we guard it with @supports so old browsers just get a solid card instead.
export const GlassCard = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  padding: clamp(20px, 4vw, 28px);
  display: flex;
  flex-direction: column;
  gap: 20px;

  @supports (backdrop-filter: blur(1px)) {
    background: ${({ theme }) => theme.colors.glassBg};
    backdrop-filter: blur(16px) saturate(140%);
    -webkit-backdrop-filter: blur(16px) saturate(140%);
  }

  /* fallback for browsers that don't support backdrop-filter */
  @supports not (backdrop-filter: blur(1px)) {
    background: ${({ theme }) => theme.colors.cardBg};
  }

  box-shadow: ${({ theme }) => theme.colors.shadowMd};
`;

export const CardTitle = styled.h2`
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CardSubtitle = styled.p`
  font-size: clamp(0.8rem, 2vw, 0.875rem);
  color: ${({ theme }) => theme.colors.textTertiary};
  margin: -12px 0 0;
`;

// one form field group: label + input stacked vertically
export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.label`
  font-size: clamp(0.8rem, 2vw, 0.875rem);
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

// shared input styling used for text, email, and password fields
export const Input = styled.input`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid ${({ $error, theme }) => $error ? theme.colors.error : theme.colors.inputBorder};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.inputBg};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  font-family: ${({ theme }) => theme.fonts.primary};
  transition: ${({ theme }) => theme.transitions.fast};

  &::placeholder { color: ${({ theme }) => theme.colors.textTertiary}; }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.inputFocus};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.inputFocus}20`};
  }
`;

// role selector wrapper uses SelectChevronWrap so the animated arrow works
export const RoleSelectWrap = styled(SelectChevronWrap)`
  width: 100%;
`;

export const RoleSelect = styled.select`
  width: 100%;
  padding: 10px 36px 10px 14px;
  border: 1px solid ${({ theme }) => theme.colors.inputBorder};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.inputBg};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  font-family: ${({ theme }) => theme.fonts.primary};
  appearance: none;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};

  option {
    background: ${({ theme }) => theme.colors.inputBg};
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.inputFocus};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.inputFocus}20`};
  }
`;

// inline error message under a field
export const FieldError = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  color: ${({ theme }) => theme.colors.error};
  line-height: 1.4;
`;

// feedback banner shown at the top of the form after submit
export const FeedbackBanner = styled.div`
  padding: 10px 14px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  border-left: 3px solid ${({ $type, theme }) =>
    $type === 'success' ? theme.colors.success : theme.colors.error};
  background: ${({ $type, theme }) =>
    $type === 'success' ? theme.colors.successBg : theme.colors.errorBg};
  color: ${({ $type, theme }) =>
    $type === 'success' ? theme.colors.success : theme.colors.error};
`;

// submit button for the create-account form
export const SubmitBtn = styled.button`
  width: 100%;
  padding: 12px 20px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.accentPrimary};
  color: ${({ theme }) => theme.colors.textOnAccent};
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-family: ${({ theme }) => theme.fonts.primary};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.accentHover};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

// the user list card — plain card (not glass) so the table reads cleanly
export const ListCard = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  box-shadow: ${({ theme }) => theme.colors.shadowSm};
  overflow: hidden;
`;

export const ListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  flex-wrap: wrap;
`;

// search + filter toolbar below the list header
export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  flex-wrap: wrap;

  @media (max-width: 414px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const SearchInputWrap = styled.div`
  position: relative;
  flex: 1;
  min-width: 180px;

  svg {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.textTertiary};
    pointer-events: none;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 8px 12px 8px 32px;
  border: 1px solid ${({ theme }) => theme.colors.inputBorder};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.inputBg};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  font-family: ${({ theme }) => theme.fonts.primary};
  transition: ${({ theme }) => theme.transitions.fast};

  &::placeholder { color: ${({ theme }) => theme.colors.textTertiary}; }
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.inputFocus};
  }
`;

export const RoleFilterWrap = styled(SelectChevronWrap)`
  flex-shrink: 0;
  min-width: 130px;
`;

export const RoleFilter = styled.select`
  width: 100%;
  padding: 8px 32px 8px 10px;
  border: 1px solid ${({ theme }) => theme.colors.inputBorder};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.inputBg};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  font-family: ${({ theme }) => theme.fonts.primary};
  appearance: none;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};

  option {
    background: ${({ theme }) => theme.colors.inputBg};
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  &:focus { outline: none; border-color: ${({ theme }) => theme.colors.inputFocus}; }
`;

// the scrollable table wrapper prevents horizontal overflow on mobile
export const TableWrap = styled.div`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
`;

export const Thead = styled.thead`
  background: ${({ theme }) => theme.colors.bgTertiary};
`;

export const Th = styled.th`
  padding: 10px 16px;
  text-align: left;
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.textTertiary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
`;

export const Tr = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  transition: background ${({ theme }) => theme.transitions.fast};

  &:last-child { border-bottom: none; }
  &:hover { background: ${({ theme }) => theme.colors.bgTertiary}; }
`;

export const Td = styled.td`
  padding: 12px 16px;
  color: ${({ theme }) => theme.colors.textPrimary};
  white-space: nowrap;
`;

// color-coded role badge
const ROLE_COLORS = {
  Admin: { bg: '#172554', text: '#60a5fa' },
  Organizer: { bg: '#052e16', text: '#22c55e' },
  Staff: { bg: '#422006', text: '#f59e0b' },
  Attendee: { bg: '#1c1c1c', text: '#94a3b8' },
};
const LIGHT_ROLE_COLORS = {
  Admin: { bg: '#dbeafe', text: '#1d4ed8' },
  Organizer: { bg: '#dcfce7', text: '#15803d' },
  Staff: { bg: '#fef3c7', text: '#b45309' },
  Attendee: { bg: '#f1f5f9', text: '#475569' },
};

export const RoleBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};

  ${({ $role, theme }) => {
    const isDark = theme.colors.bgPrimary === '#0a0a0a';
    const c = isDark
      ? (ROLE_COLORS[$role]       || ROLE_COLORS.Attendee)
      : (LIGHT_ROLE_COLORS[$role] || LIGHT_ROLE_COLORS.Attendee);
    return `background: ${c.bg}; color: ${c.text};`;
  }}
`;

// empty state when no users match the search
export const EmptyRow = styled.tr`
  td {
    padding: 40px 16px;
    text-align: center;
    color: ${({ theme }) => theme.colors.textTertiary};
    font-size: ${({ theme }) => theme.fontSizes.bodySm};
  }
`;

// pagination row at the bottom of the table
export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
  gap: 12px;
  flex-wrap: wrap;
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  color: ${({ theme }) => theme.colors.textTertiary};
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
    $active ? theme.colors.textOnAccent : theme.colors.textSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  font-family: ${({ theme }) => theme.fonts.primary};
  opacity: ${({ disabled }) => disabled ? 0.4 : 1};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover:not(:disabled):not([aria-current]) {
    background: ${({ theme }) => theme.colors.bgHover};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;
