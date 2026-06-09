import styled, { keyframes, css } from 'styled-components';
import SelectChevronWrap from '../../components/Shared/SelectChevronWrap';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// Page shell — replaced by admin DashboardShell in Phase 8
// these components are no longer used after AnalyticsView was upgraded to share
// the same DashboardShell / MainArea / DashboardContent shell as Dashboard,
// Events, and AttendeeManagement. kept below as comments for reference.
/*
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
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  animation: ${fadeUp} 0.2s ease;

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;
*/

// Filter bar
export const FilterBar = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  flex: 1;
  min-width: 160px;

  label {
    font-size: ${({ theme }) => theme.fontSizes.bodyXs};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    color: ${({ theme }) => theme.colors.textTertiary};
    white-space: nowrap;
  }
`;

export const FilterSelectWrap = styled(SelectChevronWrap)`
  flex: 1;
`;

export const FilterSelect = styled.select`
  width: 100%;  /* old: flex:1 — moved to FilterSelectWrap */
  background: ${({ theme }) => theme.colors.inputBg};
  border: 1px solid ${({ theme }) => theme.colors.inputBorder};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 7px 32px 7px 10px;
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.fonts.primary};
  cursor: pointer;
  appearance: none;
  /* old: background-image svg arrow — removed, FilterSelectWrap::after handles it */
  transition: ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.inputFocus};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.inputFocus}20`};
  }
`;

export const FilterInput = styled.input`
  flex: 1;
  background: ${({ theme }) => theme.colors.inputBg};
  border: 1px solid ${({ theme }) => theme.colors.inputBorder};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 7px 10px;
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.fonts.primary};
  transition: ${({ theme }) => theme.transitions.fast};

  &::placeholder { color: ${({ theme }) => theme.colors.textTertiary}; }
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.inputFocus};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.inputFocus}20`};
  }
`;

export const FilterDivider = styled.div`
  width: 1px;
  height: 24px;
  background: ${({ theme }) => theme.colors.borderColor};
  flex-shrink: 0;

  @media (max-width: 768px) { display: none; }
`;

// wider variant for the text search group — needs more room than 160px default
export const SearchFilterGroup = styled(FilterGroup)`
  min-width: 200px;
`;

// label that contains a leading SVG icon (e.g. "search" label in ReportFilters)
export const FilterLabelWithIcon = styled.label`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textTertiary};
  white-space: nowrap;
`;

// Section card
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
  gap: ${({ theme }) => theme.spacing.md};

  h2 {
    font-size: ${({ theme }) => theme.fontSizes.h5};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    color: ${({ theme }) => theme.colors.textPrimary};
    margin: 0 0 2px;
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xs};
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

export const CardActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-shrink: 0;
`;

// Metric grid (reuse pattern from Dashboard)
export const MetricGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 480px)  { grid-template-columns: 1fr; }
`;

// Chart area
export const ChartWrapper = styled.div`
  overflow: visible; /* required so Recharts tooltip renders above bars */
  width: 100%;

  /* recharts SVG elements inherit font */
  .recharts-text { font-family: ${({ theme }) => theme.fonts.primary}; }
  .recharts-cartesian-grid-horizontal line,
  .recharts-cartesian-grid-vertical line {
    stroke: ${({ theme }) => theme.colors.borderColor};
  }
`;

// Custom recharts tooltip
export const TooltipCard = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 8px 12px;
  box-shadow: ${({ theme }) => theme.colors.shadowMd};
  pointer-events: none;
`;

export const TooltipLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0 0 4px;
`;

export const TooltipRow = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 1px 0;
`;

// Export button group
export const ExportGroup = styled.div`
  display: flex;
  gap: 4px;
`;

export const ExportBtn = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: 7px 14px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-family: ${({ theme }) => theme.fonts.primary};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.bgTertiary};
    border-color: ${({ theme }) => theme.colors.borderDark};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

// Spinner (used inside ExportBtn during loading)
export const Spinner = styled.span`
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 2px solid ${({ theme }) => theme.colors.borderColor};
  border-top-color: ${({ theme }) => theme.colors.accentPrimary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  animation: spin 0.7s linear infinite;
  flex-shrink: 0;

  @keyframes spin { to { transform: rotate(360deg); } }
`;

// Report table
export const TableWrapper = styled.div`
  overflow-x: auto;
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
  cursor: ${({ $sortable }) => $sortable ? 'pointer' : 'default'};
  user-select: none;

  /* old: malformed interpolation — both branches said "{ color:" with no closing brace */
  ${({ $sortable, theme }) => $sortable && `
    &:hover { color: ${theme.colors.textPrimary}; }
  `}
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
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const MaskedCell = styled(Td)`
  color: ${({ theme }) => theme.colors.textTertiary};
  font-style: italic;
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
`;

// Pagination (shared with AttendeeManagement)
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
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.textTertiary};
  p { margin: 0 0 4px; font-size: ${({ theme }) => theme.fontSizes.bodyMd}; }
  small { font-size: ${({ theme }) => theme.fontSizes.bodyXs}; }
`;

// Blueprint 8: Filter Sidebar Panel + Analytics Grid Layout
// left panel (filters) + right column (metrics → chart → table)
// on ≤768px the panel hides and a bottom-sheet drawer takes over

export const AnalyticsLayout = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
  /* needed so position:sticky on FilterSidePanel works */
  overflow: visible;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

export const FilterSidePanel = styled.aside`
  width: 258px;
  flex-shrink: 0;
  position: sticky;
  top: 72px; /* just below the 60px DashboardHeader + 12px gap */
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  max-height: calc(100vh - 96px);
  overflow-y: auto;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.borderColor};
    border-radius: 2px;
  }

  /* on mobile the panel is hidden — the bottom drawer takes over */
  @media (max-width: 768px) {
    display: none;
  }
`;

export const FilterPanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  flex-shrink: 0;
  position: sticky;
  top: 0;
  background: ${({ theme }) => theme.colors.cardBg};
  z-index: 1;
`;

export const FilterPanelTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;

  svg { color: ${({ theme }) => theme.colors.accentPrimary}; flex-shrink: 0; }
`;

export const FilterResetBtn = styled.button`
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.accentPrimary};
  cursor: pointer;
  padding: 0;
  transition: ${({ theme }) => theme.transitions.fast};
  &:hover:not(:disabled) { opacity: 0.7; }
  &:disabled { opacity: 0.3; cursor: not-allowed; }
`;

// single filter section (one per filter type — stacked vertically in the panel)
export const FilterSectionGroup = styled.div`
  padding: 12px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  display: flex;
  flex-direction: column;
  gap: 6px;

  &:last-child { border-bottom: none; }
`;

export const FilterSectionLabel = styled.label`
  font-size: 10px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.textTertiary};
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

// small "to" separator between the two date inputs
export const FilterDateSep = styled.div`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  color: ${({ theme }) => theme.colors.textTertiary};
  line-height: 1;
`;

// main content area to the right of the filter panel
export const AnalyticsContent = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

// Mobile Filter Drawer trigger (only visible on ≤768px)
export const FilterDrawerBtn = styled.button`
  display: none;
  align-items: center;
  gap: 5px;
  padding: 6px 12px;
  background: ${({ theme }) => theme.colors.bgTertiary};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition: ${({ theme }) => theme.transitions.fast};

  svg { flex-shrink: 0; }

  &:hover {
    background: ${({ theme }) => theme.colors.bgHover ?? theme.colors.borderColor};
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

// pill badge showing number of active filters on the mobile button
export const FilterActiveBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  background: ${({ theme }) => theme.colors.accentPrimary};
  color: #fff;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 10px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: 1;
`;

// Mobile Filter Drawer (bottom sheet)
export const FilterDrawerOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.52);
  z-index: 300;
  pointer-events: ${({ $open }) => $open ? 'all' : 'none'};
  opacity: ${({ $open }) => $open ? 1 : 0};
  transition: opacity 0.22s ease;

  @supports (backdrop-filter: blur(1px)) {
    backdrop-filter: blur(2px);
  }
`;

export const FilterDrawer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.cardBg};
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.xl} ${({ theme }) => theme.borderRadius.xl} 0 0;
  z-index: 301;
  max-height: 85vh;
  overflow-y: auto;
  transform: ${({ $open }) => $open ? 'translateY(0)' : 'translateY(100%)'};
  transition: transform 0.26s cubic-bezier(0.4, 0, 0.2, 1);

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.borderColor};
    border-radius: 2px;
  }
`;

export const FilterDrawerHandle = styled.div`
  width: 40px;
  height: 4px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.borderColor};
  margin: 10px auto 0;
  flex-shrink: 0;
`;

export const FilterDrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  position: sticky;
  top: 0;
  background: ${({ theme }) => theme.colors.cardBg};
  z-index: 1;
`;

export const FilterDrawerTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;

  svg { color: ${({ theme }) => theme.colors.accentPrimary}; }
`;

export const FilterDrawerCloseBtn = styled.button`
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

  &:hover {
    background: ${({ theme }) => theme.colors.bgHover ?? theme.colors.bgTertiary};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const FilterDrawerBody = styled.div`
  padding: 0 0 32px; /* bottom safe-area padding */
`;

export const DrawerApplyBtn = styled.button`
  width: calc(100% - 40px);
  margin: 16px 20px 0;
  display: block;
  padding: 12px;
  background: ${({ theme }) => theme.colors.accentPrimary};
  color: #fff;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.bodyMd};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  &:hover { background: ${({ theme }) => theme.colors.accentSecondary}; }
`;

// PII Toggle (Admin-only switch to unmask student emails / IDs)
export const PIIToggleSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 12px 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
`;

export const PIIToggleLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
`;

export const PIIToggleTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const PIIToggleSub = styled.div`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.textTertiary};
  line-height: 1.4;
`;

// accessible toggle switch track
export const ToggleTrack = styled.button`
  position: relative;
  width: 40px;
  height: 22px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: none;
  cursor: pointer;
  flex-shrink: 0;
  padding: 0;
  transition: background 0.2s ease;
  background: ${({ $on, theme }) => $on ? theme.colors.accentPrimary : theme.colors.bgTertiary};

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accentPrimary};
    outline-offset: 2px;
  }
`;

// toggle knob slides from left to right when $on
export const ToggleKnob = styled.span`
  position: absolute;
  top: 3px;
  left: ${({ $on }) => $on ? '21px' : '3px'};
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  transition: left 0.2s ease;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.28);
  pointer-events: none;
`;

// StatusBadges for ReportTable
// attendance status: Present (green), Absent (red), Late (amber), default (neutral)
export const AttendanceBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 10px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  white-space: nowrap;

  ${({ $status, theme }) => {
    switch (($status ?? '').toLowerCase()) {
      case 'present': return `
        background: ${theme.colors.successBg};
        color: ${theme.colors.success};
      `;
      case 'absent': return `
        background: ${theme.colors.errorBg};
        color: ${theme.colors.error};
      `;
      case 'late': return `
        background: ${theme.colors.warningBg};
        color: ${theme.colors.warning};
      `;
      default: return `
        background: ${theme.colors.bgTertiary};
        color: ${theme.colors.textTertiary};
      `;
    }
  }}
`;

// registration status: Confirmed (green), Pending (amber), Cancelled/Waitlisted (red)
export const RegStatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 10px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  white-space: nowrap;

  ${({ $status, theme }) => {
    switch (($status ?? '').toLowerCase()) {
      case 'confirmed': return `
        background: ${theme.colors.successBg};
        color: ${theme.colors.success};
      `;
      case 'pending': return `
        background: ${theme.colors.warningBg};
        color: ${theme.colors.warning};
      `;
      case 'cancelled':
      case 'waitlisted': return `
        background: ${theme.colors.errorBg};
        color: ${theme.colors.error};
      `;
      default: return `
        background: ${theme.colors.bgTertiary};
        color: ${theme.colors.textTertiary};
      `;
    }
  }}
`;

// ReportTable inline-style replacements
// wraps the sort chevron SVG — controls opacity and margin without inline styles
export const SortIconWrap = styled.span`
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
  opacity: ${({ $active }) => $active ? 1 : 0.3};
  flex-shrink: 0;
`;

// label + select for the page-size picker in the pagination row
export const PageSizeLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  color: ${({ theme }) => theme.colors.textTertiary};
  cursor: default;
`;

export const PageSizeSelect = styled.select`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: inherit;
  padding: 0 2px;
  outline: none;

  &:focus-visible {
    outline: 1px solid ${({ theme }) => theme.colors.accentPrimary};
    border-radius: 2px;
  }
`;

// empty-state cell in the tbody — avoids inline textAlign + padding
export const EmptyTableCell = styled(Td)`
  text-align: center;
  padding: 2rem ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textTertiary};
`;

// AnalyticsChart inline-style replacements

// outer wrapper for the loading skeleton — adds vertical breathing room
export const ChartSkeletonWrap = styled.div`
  padding: 16px 0;
`;

// flex row that holds the x-axis label skeleton lines
// 42px left padding matches the recharts y-axis width so skeletons line up with bars
export const ChartSkeletonAxisRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
  padding: 0 42px;
`;

// "no session data" empty state — vertically and horizontally centred
export const ChartEmptyState = styled.div`
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  color: ${({ theme }) => theme.colors.textTertiary};
`;

// visually-hidden accessible table (sr-only pattern) —
// screen readers parse the numbers; sighted users see only the bar chart
export const ChartA11yTable = styled.table`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;
