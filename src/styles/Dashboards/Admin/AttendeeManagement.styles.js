import styled, { keyframes, css } from 'styled-components';
import SelectChevronWrap from '../../../components/Shared/SelectChevronWrap';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// Page shell
export const PageShell = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bgPrimary};
  display: flex;
  flex-direction: column;
`;

export const PageHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  background: ${({ theme }) => theme.colors.cardBg};
  flex-shrink: 0;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const PageHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const BackBtn = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.bgTertiary};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const PageTitle = styled.div`
  h1 {
    font-size: ${({ theme }) => theme.fontSizes.h5};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    color: ${({ theme }) => theme.colors.textPrimary};
    margin: 0;
  }
  p {
    font-size: ${({ theme }) => theme.fontSizes.bodyXs};
    color: ${({ theme }) => theme.colors.textTertiary};
    margin: 2px 0 0;
  }
`;

export const PageHeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const PageContent = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.xl};
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  animation: ${fadeIn} 0.2s ease;

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

// Event selector bar
export const EventSelectorRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
  /* margin removed — parent DashboardContent uses gap: 24px */
`;

export const EventSelectorLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
  white-space: nowrap;
`;

export const EventSelect = styled.select`
  background: ${({ theme }) => theme.colors.inputBg};
  border: 1px solid ${({ theme }) => theme.colors.inputBorder};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 8px ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.bodyMd};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.fonts.primary};
  min-width: 260px;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.inputFocus};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.inputFocus}20`};
  }
`;

// Segmented control
export const SegmentedControl = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.bgTertiary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 3px;
  gap: 2px;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  width: fit-content;
`;

export const SegTab = styled.button`
  padding: 7px 20px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};

  ${({ $active, theme }) => $active ? css`
    background: ${theme.colors.cardBg};
    color: ${theme.colors.textPrimary};
    box-shadow: ${theme.colors.shadowSm};
  ` : css`
    background: transparent;
    color: ${theme.colors.textTertiary};
    &:hover { color: ${theme.colors.textSecondary}; }
  `}
`;

// Section card (shared)
export const SectionCard = styled.section`
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  overflow: hidden;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};

  h2 {
    font-size: ${({ theme }) => theme.fontSizes.h5};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    color: ${({ theme }) => theme.colors.textPrimary};
    margin: 0 0 2px;
  }
  p {
    font-size: ${({ theme }) => theme.fontSizes.bodySm};
    color: ${({ theme }) => theme.colors.textTertiary};
    margin: 0;
  }
`;

export const CardBody = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
`;

// Form primitives (shared with StepperFormModal variants)
export const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const Label = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};

  .required { color: ${({ theme }) => theme.colors.error}; margin-left: 2px; }
`;

const inputBase = css`
  width: 100%;
  background: ${({ theme }) => theme.colors.inputBg};
  border: 1px solid ${({ theme }) => theme.colors.inputBorder};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 10px ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.bodyMd};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.fonts.primary};
  transition: ${({ theme }) => theme.transitions.fast};
  box-sizing: border-box;

  &::placeholder { color: ${({ theme }) => theme.colors.textTertiary}; }
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.inputFocus};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.inputFocus}20`};
  }
`;

export const Input    = styled.input`${inputBase}`;
export const SelectWrap = styled(SelectChevronWrap)`width: 100%;`;
export const Select   = styled.select`
  ${inputBase}
  cursor: pointer;
  appearance: none;
  padding-right: 36px;
  /* old: background-image svg arrow — removed, SelectWrap::after handles it */
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: 480px) { grid-template-columns: 1fr; }
`;

// Inline feedback
export const FeedbackBanner = styled.div`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  ${({ $type, theme }) =>
    $type === 'error'
      ? `background:${theme.colors.errorBg}; color:${theme.colors.error}; border-left:3px solid ${theme.colors.error};`
      : `background:${theme.colors.successBg}; color:${theme.colors.success}; border-left:3px solid ${theme.colors.success};`}
`;

// Dropzone
export const DropzoneArea = styled.div`
  border: 2px dashed ${({ $dragging, theme }) =>
    $dragging ? theme.colors.accentPrimary : theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.xl};
  text-align: center;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  background: ${({ $dragging, theme }) =>
    $dragging ? `${theme.colors.accentPrimary}08` : theme.colors.bgSecondary};

  &:hover {
    border-color: ${({ theme }) => theme.colors.accentPrimary};
    background: ${({ theme }) => `${theme.colors.accentPrimary}08`};
  }
`;

export const DropzoneIcon = styled.div`
  color: ${({ theme }) => theme.colors.textTertiary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const DropzoneText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.bodyMd};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0 0 ${({ theme }) => theme.spacing.xs};
`;

export const DropzoneHint = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  color: ${({ theme }) => theme.colors.textTertiary};
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
`;

// File chip (selected file display)
export const FileChip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  background: ${({ theme }) => theme.colors.bgTertiary};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 8px 14px;
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const FileChipRemove = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textTertiary};
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  transition: ${({ theme }) => theme.transitions.fast};
  &:hover { color: ${({ theme }) => theme.colors.error}; }
`;

// Upload progress bar
export const ProgressBar = styled.div`
  height: 4px;
  background: ${({ theme }) => theme.colors.bgTertiary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  overflow: hidden;
  margin: ${({ theme }) => theme.spacing.md} 0;

  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${({ $pct }) => $pct}%;
    background: ${({ theme }) => theme.colors.accentPrimary};
    transition: width 0.2s ease;
  }
`;

// Upload result summary
export const ResultSummary = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.bgSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
`;

export const ResultChip = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ $color, theme }) => theme.colors[$color] || theme.colors.textPrimary};
`;

// Error table
export const TableWrapper = styled.div`
  overflow-x: auto;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};

  /* on narrow mobile the table is replaced by expandable card stacks */
  @media (max-width: 414px) {
    display: none;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
`;

export const Thead = styled.thead`
  background: ${({ theme }) => theme.colors.bgSecondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
`;

export const Th = styled.th`
  padding: 10px ${({ theme }) => theme.spacing.md};
  text-align: left;
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.textTertiary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
`;

export const Tr = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  &:last-child { border-bottom: none; }
  &:hover { background: ${({ theme }) => theme.colors.bgSecondary}; }
`;

export const Td = styled.td`
  padding: 10px ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  vertical-align: middle;
`;

export const ErrorCell = styled(Td)`
  color: ${({ theme }) => theme.colors.error};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

// Pagination
export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const PaginationInfo = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  color: ${({ theme }) => theme.colors.textTertiary};
`;

export const PaginationControls = styled.div`
  display: flex;
  gap: 4px;
`;

export const PageBtn = styled.button`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 1px solid ${({ $active, theme }) => $active ? theme.colors.accentPrimary : theme.colors.borderColor};
  background: ${({ $active, theme }) => $active ? theme.colors.accentPrimary : 'transparent'};
  color: ${({ $active, theme }) => $active ? '#fff' : theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled { opacity: 0.4; cursor: not-allowed; }
  &:not(:disabled):not([aria-current]):hover {
    background: ${({ theme }) => theme.colors.bgTertiary};
    border-color: ${({ theme }) => theme.colors.borderDark};
  }
`;

// Attendee list (below the upload/form section)
// SearchWrap — icon + input in a flex row
export const SearchWrap = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex: 1;
  min-width: 180px;

  svg {
    flex-shrink: 0;
    color: ${({ theme }) => theme.colors.textTertiary};
  }
`;

// AssignBtn — primary action in the list toolbar
export const AssignBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  background: ${({ theme }) => theme.colors.accentPrimary};
  color: #fff;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
  white-space: nowrap;
  transition: ${({ theme }) => theme.transitions.fast};
  flex-shrink: 0;

  &:hover { background: ${({ theme }) => theme.colors.accentSecondary}; }
  &:focus-visible { outline: 2px solid ${({ theme }) => theme.colors.accentPrimary}; outline-offset: 2px; }
`;

// ClearSelectionBtn — text-only "Clear" in the bulk bar
export const ClearSelectionBtn = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textTertiary};
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  cursor: pointer;
  padding: 0;
  transition: ${({ theme }) => theme.transitions.fast};
  &:hover { color: ${({ theme }) => theme.colors.textPrimary}; }
`;

// StatusFilterSelect — status dropdown in the card header
export const StatusFilterSelectWrap = styled(SelectChevronWrap)`
  flex-shrink: 0;
  min-width: 140px;
`;

export const StatusFilterSelect = styled.select`
  width: 100%;  /* old: min-width + flex-shrink moved to StatusFilterSelectWrap */
  background: ${({ theme }) => theme.colors.inputBg ?? theme.colors.bgTertiary};
  border: 1px solid ${({ theme }) => theme.colors.inputBorder ?? theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 7px 32px 7px 12px;
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.fonts?.primary};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  appearance: none;
  /* old: background-image svg arrow — removed */

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accentPrimary};
  }
`;

// TotalChip — count pill next to "Registered Attendees" heading
export const TotalChip = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 8px;
  background: ${({ theme }) => theme.colors.accentPrimary};
  color: #fff;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 11px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-left: 8px;
  vertical-align: middle;
`;

// PIINotice — small inline note for non-Admin roles
export const PIINotice = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 10px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.warning};
  background: ${({ theme }) => theme.colors.warningBg};
  padding: 2px 8px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  margin-right: 8px;
  vertical-align: middle;
`;

// NameCell — name text + optional stub tag
export const NameCell = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

// StubTag — tiny badge for stub (password-less) users
export const StubTag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 1px 6px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 9px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.04em;
  background: ${({ theme }) => theme.colors.bgTertiary};
  color: ${({ theme }) => theme.colors.textTertiary};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
`;

// MaskedValue — backend-masked email display
export const MaskedValue = styled.span`
  font-family: monospace;
  font-size: 0.8em;
  color: ${({ theme }) => theme.colors.textTertiary};
  opacity: 0.75;
`;

// RowSkeleton — skeleton placeholder for table rows while loading
export const RowSkeleton = styled.div`
  height: 16px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ theme }) => theme.colors.bgTertiary};
  width: 60%;
  animation: skeletonPulse 1.4s ease-in-out infinite;

  @keyframes skeletonPulse {
    0%, 100% { opacity: 0.5; }
    50%       { opacity: 1; }
  }
`;

// ListEmptyState — centered empty state for the attendee table
export const ListEmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.xl};
  text-align: center;
  color: ${({ theme }) => theme.colors.textTertiary};

  svg { opacity: 0.3; margin-bottom: ${({ theme }) => theme.spacing.xs}; }
  p   { font-size: ${({ theme }) => theme.fontSizes.bodyMd}; margin: 0; color: ${({ theme }) => theme.colors.textSecondary}; }
  small { font-size: ${({ theme }) => theme.fontSizes.bodyXs}; }
`;

// Mobile card stacks (≤414px only)

// container — hidden on desktop, shown on narrow mobile
export const MobileCardList = styled.div`
  display: none;
  flex-direction: column;
  gap: 1px;

  @media (max-width: 414px) {
    display: flex;
  }
`;

export const AttendeeCard = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  transition: ${({ theme }) => theme.transitions.fast};
`;

// top row: checkbox + name/badge block + expand chevron
export const CardRowMain = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
`;

export const CardNameBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
`;

export const CardAttendeeName = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CardExpandBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 6px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  color: ${({ theme }) => theme.colors.textTertiary};
  cursor: pointer;
  flex-shrink: 0;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover { background: ${({ theme }) => theme.colors.bgHover ?? theme.colors.bgTertiary}; }
`;

// arrow icon that rotates 90° when card is expanded
export const ExpandIcon = styled.span`
  display: inline-flex;
  transition: transform 0.2s ease;
  transform: ${({ $rotated }) => $rotated ? 'rotate(90deg)' : 'rotate(0deg)'};
`;

// expanded detail body
export const CardExpanded = styled.div`
  padding: 0 ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.md};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
  background: ${({ theme }) => theme.colors.bgSecondary ?? theme.colors.bgPrimary};
`;

export const CardDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding-top: ${({ theme }) => theme.spacing.sm};
`;

export const CardDetailLabel = styled.div`
  font-size: 10px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.textTertiary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const CardDetailValue = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  color: ${({ theme }) => theme.colors.textPrimary};
  word-break: break-word;
`;

export const ListToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

export const SearchInput = styled.input`
  background: ${({ theme }) => theme.colors.inputBg};
  border: 1px solid ${({ theme }) => theme.colors.inputBorder};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 8px 12px;
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.fonts.primary};
  min-width: 200px;
  transition: ${({ theme }) => theme.transitions.fast};

  &::placeholder { color: ${({ theme }) => theme.colors.textTertiary}; }
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.inputFocus};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.inputFocus}20`};
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.textTertiary};

  p { margin: 0 0 4px; font-size: ${({ theme }) => theme.fontSizes.bodyMd}; }
  small { font-size: ${({ theme }) => theme.fontSizes.bodyXs}; }
`;

// Checkbox
export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 16px;
  height: 16px;
  accent-color: ${({ theme }) => theme.colors.accentPrimary};
  cursor: pointer;
`;

export const BulkBar = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => `${theme.colors.accentPrimary}10`};
  border-bottom: 1px solid ${({ theme }) => `${theme.colors.accentPrimary}30`};
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;
