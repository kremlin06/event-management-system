import styled from 'styled-components';

export const CreateEventContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.bgPrimary};
  min-height: calc(100vh - 64px);
`;

export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const BackButton = styled.button`
  background: ${({ theme }) => theme.colors.bgTertiary};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.bgHover};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const PageTitle = styled.div`
  flex: 1;

  h1 {
    font-size: ${({ theme }) => theme.fontSizes.h3};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    color: ${({ theme }) => theme.colors.textPrimary};
    margin: 0 0 4px 0;
  }

  .breadcrumb {
    font-size: ${({ theme }) => theme.fontSizes.bodySm};
    color: ${({ theme }) => theme.colors.textTertiary};
    margin: 0;
  }
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

export const MainForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const FormSection = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
`;

export const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.h4};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  .optional {
    font-size: ${({ theme }) => theme.fontSizes.bodyXs};
    color: ${({ theme }) => theme.colors.textTertiary};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    background: ${({ theme }) => theme.colors.bgTertiary};
    padding: 2px 8px;
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }
`;

export const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};

  &:last-child {
    margin-bottom: 0;
  }
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

export const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.bgTertiary};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-family: inherit;
  transition: ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accentPrimary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.infoBg};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textTertiary};
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.bgTertiary};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-family: inherit;
  min-height: 120px;
  resize: vertical;
  transition: ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accentPrimary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.infoBg};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textTertiary};
  }
`;

export const UploadArea = styled.div`
  border: 2px dashed ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  background: ${({ theme }) => theme.colors.bgTertiary};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.accentPrimary};
    background: ${({ theme }) => theme.colors.bgHover};
  }

  .upload-icon {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.accentPrimary};
  }

  .upload-text {
    font-size: ${({ theme }) => theme.fontSizes.bodySm};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    color: ${({ theme }) => theme.colors.textPrimary};
    margin-bottom: 4px;
  }

  .upload-hint {
    font-size: ${({ theme }) => theme.fontSizes.bodyXs};
    color: ${({ theme }) => theme.colors.textTertiary};
  }
`;

export const StatusGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const StatusButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ active, theme }) => active ? theme.colors.infoBg : theme.colors.bgTertiary};
  border: 2px solid ${({ active, theme }) => active ? theme.colors.info : theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ active, theme }) => active ? theme.colors.info : theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  font-weight: ${({ active, theme }) => active ? theme.fontWeights.semibold : theme.fontWeights.regular};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};

  &:hover {
    border-color: ${({ theme }) => theme.colors.accentPrimary};
  }

  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ active, theme }) => active ? theme.colors.info : 'transparent'};
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
`;

// added: thumbnail shown after a file is selected in the image upload area
export const ImagePreview = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  position: relative;

  img {
    width: 100%;
    height: 160px;
    object-fit: cover;
    display: block;
  }

  .preview-remove {
    position: absolute;
    top: 8px;
    right: 8px;
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    padding: 4px 8px;
    font-size: ${({ theme }) => theme.fontSizes.bodyXs};
    cursor: pointer;
    line-height: 1;
    transition: ${({ theme }) => theme.transitions.fast};

    &:hover {
      background: rgba(0, 0, 0, 0.8);
    }
  }

  .preview-label {
    padding: 6px ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.fontSizes.bodyXs};
    color: ${({ theme }) => theme.colors.textTertiary};
    background: ${({ theme }) => theme.colors.bgTertiary};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

// added: inline success/error banner shown after form submit attempt
export const FeedbackBanner = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin-top: ${({ theme }) => theme.spacing.sm};
  animation: fadeIn 0.2s ease;

  background: ${({ $type, theme }) =>
    $type === 'success' ? theme.colors.successBg : theme.colors.errorBg};
  color: ${({ $type, theme }) =>
    $type === 'success' ? theme.colors.success : theme.colors.error};
  border: 1px solid ${({ $type, theme }) =>
    $type === 'success' ? theme.colors.success + '40' : theme.colors.error + '40'};

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-4px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

export const Skeleton = styled.div`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '20px'};
  background: ${({ theme }) => theme.colors.bgTertiary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  animation: pulse 1.5s infinite ease-in-out;

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;