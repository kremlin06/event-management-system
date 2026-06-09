import styled, { keyframes, css } from 'styled-components';
import SelectChevronWrap from '../../../components/Shared/SelectChevronWrap';

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// Overlay
export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(3px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.md};
  animation: ${fadeIn} 0.2s ease;
`;

// Modal card
export const ModalCard = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.colors.shadowXl};
  width: 100%;
  max-width: 640px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: ${slideUp} 0.25s ease;

  @media (max-width: 640px) {
    max-height: 100vh;
    border-radius: ${({ theme }) => theme.borderRadius.lg} ${({ theme }) => theme.borderRadius.lg} 0 0;
    align-self: flex-end;
  }
`;

// Modal header
export const ModalHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  flex-shrink: 0;
`;

export const ModalTitle = styled.div`
  h2 {
    font-size: ${({ theme }) => theme.fontSizes.h5};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    color: ${({ theme }) => theme.colors.textPrimary};
    margin: 0 0 2px;
    line-height: 1.3;
  }
  p {
    font-size: ${({ theme }) => theme.fontSizes.bodySm};
    color: ${({ theme }) => theme.colors.textSecondary};
    margin: 0;
  }
`;

export const CloseBtn = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textTertiary};
  cursor: pointer;
  padding: 4px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover { color: ${({ theme }) => theme.colors.textPrimary}; }
`;

// Step indicator
export const StepRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  flex-shrink: 0;
`;

export const StepItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  flex: 1;
`;

export const StepCircle = styled.div`
  width: 28px;
  height: 28px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  flex-shrink: 0;
  transition: ${({ theme }) => theme.transitions.fast};

  ${({ $state, theme }) => {
    if ($state === 'active') return css`
      background: ${theme.colors.accentPrimary};
      color: #fff;
    `;
    if ($state === 'done') return css`
      background: ${theme.colors.success};
      color: #fff;
    `;
    return css`
      background: ${theme.colors.bgTertiary};
      color: ${theme.colors.textTertiary};
    `;
  }}
`;

export const StepLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ $state, theme }) =>
    $state === 'active'   ? theme.colors.textPrimary :
    $state === 'done'     ? theme.colors.success :
                            theme.colors.textTertiary};
  transition: ${({ theme }) => theme.transitions.fast};
`;

export const StepConnector = styled.div`
  flex: 1;
  height: 1px;
  background: ${({ $done, theme }) =>
    $done ? theme.colors.success : theme.colors.borderColor};
  margin: 0 ${({ theme }) => theme.spacing.sm};
  transition: background 0.3s;
`;

// Scrollable body
export const ModalBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.xl};

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.borderColor};
    border-radius: 4px;
  }
`;

// Form primitives
export const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const Label = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};

  .required {
    color: ${({ theme }) => theme.colors.error};
    margin-left: 2px;
  }
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

export const Input = styled.input`${inputBase}`;

export const TextArea = styled.textarea`
  ${inputBase}
  resize: vertical;
  min-height: 88px;
  line-height: ${({ theme }) => theme.lineHeights.normal};
`;

export const SelectWrap = styled(SelectChevronWrap)`
  width: 100%;
`;

export const Select = styled.select`
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

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

// Inline feedback banner
export const FeedbackBanner = styled.div`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  ${({ $type, theme }) =>
    $type === 'error'
      ? `background: ${theme.colors.errorBg}; color: ${theme.colors.error}; border-left: 3px solid ${theme.colors.error};`
      : `background: ${theme.colors.successBg}; color: ${theme.colors.success}; border-left: 3px solid ${theme.colors.success};`}
`;

// Image upload area
export const UploadArea = styled.div`
  border: 2px dashed ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  color: ${({ theme }) => theme.colors.textTertiary};

  &:hover {
    border-color: ${({ theme }) => theme.colors.accentPrimary};
    color: ${({ theme }) => theme.colors.accentPrimary};
  }

  .upload-icon { margin-bottom: ${({ theme }) => theme.spacing.xs}; }
  .upload-text { font-size: ${({ theme }) => theme.fontSizes.bodySm}; font-weight: ${({ theme }) => theme.fontWeights.medium}; }
  .upload-hint { font-size: ${({ theme }) => theme.fontSizes.bodyXs}; margin-top: 4px; }
`;

export const ImagePreview = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;

  img {
    width: 100%;
    height: 140px;
    object-fit: cover;
    display: block;
  }

  .preview-footer {
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
  }

  .preview-name {
    font-size: ${({ theme }) => theme.fontSizes.bodyXs};
    color: ${({ theme }) => theme.colors.textSecondary};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 200px;
  }

  .preview-remove {
    background: none;
    border: none;
    color: ${({ theme }) => theme.colors.error};
    font-size: ${({ theme }) => theme.fontSizes.bodyXs};
    cursor: pointer;
    padding: 0;
    flex-shrink: 0;

    &:hover { text-decoration: underline; }
  }
`;

// Status pill selector
export const StatusGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const StatusPill = styled.button`
  padding: 6px 14px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  border: 1px solid ${({ $active, $color, theme }) => $active ? $color : theme.colors.borderColor};
  background: ${({ $active, $color }) => $active ? `${$color}18` : 'transparent'};
  color: ${({ $active, $color, theme }) => $active ? $color : theme.colors.textSecondary};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ $color }) => $color};
    color: ${({ $color }) => $color};
  }
`;

// Session builder
export const SessionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const SessionCard = styled.div`
  background: ${({ theme }) => theme.colors.bgSecondary};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  position: relative;
`;

export const SessionCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};

  .session-number {
    font-size: ${({ theme }) => theme.fontSizes.bodyXs};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    color: ${({ theme }) => theme.colors.accentPrimary};
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
`;

export const RemoveSessionBtn = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textTertiary};
  cursor: pointer;
  padding: 2px;
  display: flex;
  align-items: center;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover { color: ${({ theme }) => theme.colors.error}; }
`;

export const AddSessionBtn = styled.button`
  width: 100%;
  padding: 10px;
  border: 2px dashed ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: none;
  color: ${({ theme }) => theme.colors.textTertiary};
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.accentPrimary};
    color: ${({ theme }) => theme.colors.accentPrimary};
  }
`;

export const EmptySessions = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.textTertiary};
  font-size: ${({ theme }) => theme.fontSizes.bodySm};

  p { margin: 0 0 4px; }
  small { font-size: ${({ theme }) => theme.fontSizes.bodyXs}; }
`;

// Modal footer
export const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
  flex-shrink: 0;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const FooterLeft = styled.div``;

export const FooterRight = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;
