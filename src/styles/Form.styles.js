import styled from 'styled-components';
import SelectChevronWrap from '../components/Shared/SelectChevronWrap';

export const FormGroup = styled.div`
   display: flex;
   flex-direction: column;
   gap: 0.5rem;
`;

// dropdown select for department field
export const FormSelectWrap = styled(SelectChevronWrap)`
  width: 100%;
`;

export const FormSelect = styled.select`
   width: 100%;
   padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
   padding-right: 36px;  /* room for the css chevron on FormSelectWrap */
   font-size: ${({ theme }) => theme.fontSizes.body};
   font-family: ${({ theme }) => theme.fonts.primary};
   color: ${({ theme }) => theme.colors.textPrimary};
   background: ${({ theme }) => theme.colors.inputBg};
   border: 1px solid ${({ theme, $hasError }) =>
      $hasError ? theme.colors.error : theme.colors.inputBorder};
   border-radius: ${({ theme }) => theme.borderRadius.md};
   transition: ${({ theme }) => theme.transitions.default};
   appearance: none;
   /* old: background-image svg arrow + background-repeat/position/size — removed.
      FormSelectWrap::after handles the animated chevron now. */

   &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.inputFocus};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.inputFocus}20;
   }

   &:disabled {
      background: ${({ theme }) => theme.colors.bgTertiary};
      color: ${({ theme }) => theme.colors.textDisabled};
      cursor: not-allowed;
   }

   & option {
      background: ${({ theme }) => theme.colors.cardBg};
      color: ${({ theme }) => theme.colors.textPrimary};
      padding: 8px;
   }
`;

export const FormLabel = styled.label`
   font-size: 0.875rem;
   font-weight: 500;
   color: ${props => props.theme.colors.textSecondary};
`;

export const FormInputWrapper = styled.div`
   position: relative;
   display: flex;
   align-items: center;
`;

export const FormInput = styled.input`
   width: 100%;
   padding: 0.875rem 1rem;
   padding-right: ${props => props.$hasToggle ? '2.5rem' : '1rem'};
   background: ${props => props.theme.colors.bgTertiary};
   border: 1px solid ${props => props.theme.colors.borderColor};
   border-radius: 8px;
   color: ${props => props.theme.colors.textPrimary};
   font-size: 1rem;
   transition: ${props => props.theme.transitions.default};

   &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.accentPrimary};
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
   }

   &::placeholder {
      color: ${props => props.theme.colors.textTertiary};
   }
`;

export const PasswordToggle = styled.button`
   position: absolute;
   right: 12px;
   top: 50%;
   transform: translateY(-50%);
   background: none;
   border: none;
   color: ${props => props.theme.colors.textTertiary};
   cursor: pointer;
   padding: 4px;
   display: flex;
   align-items: center;
   justify-content: center;
   transition: ${props => props.theme.transitions.fast};

   &:hover {
      color: ${props => props.theme.colors.textSecondary};
   }

   svg {
      width: 18px;
      height: 18px;
   }
`;

export const FormOptions = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;

   @media (max-width: 640px) {
      flex-direction: column;
      gap: 1rem;
      align-items: flex-start;
   }
`;

export const CheckboxLabel = styled.label`
   display: flex;
   align-items: center;
   gap: 8px;
   font-size: 0.875rem;
   color: ${props => props.theme.colors.textSecondary};
   cursor: pointer;
   /* NFR-03 accessibility: minimum 44×44px touch target on mobile */
   min-height: 44px;
   user-select: none;
`;

export const Checkbox = styled.input`
   /* visual size unchanged (16px) — touch target is satisfied by the
      surrounding CheckboxLabel (min-height: 44px) */
   width: 16px;
   height: 16px;
   flex-shrink: 0;
   cursor: pointer;
   accent-color: ${props => props.theme.colors.accentPrimary};
`;

/* small muted line below the "Remember me" checkbox explaining the behaviour
   and confirming the session is secured (ShieldCheckSVG inline) */
export const SecurityNote = styled.p`
   margin: 0;
   padding-left: 24px;   /* aligns text under the label text, not the checkbox */
   font-size: ${({ theme }) => theme.fontSizes.bodyXs};
   color: ${({ theme }) => theme.colors.textTertiary};
   line-height: ${({ theme }) => theme.lineHeights.normal};
   display: flex;
   align-items: center;
   gap: 4px;

   svg {
      color: ${({ theme }) => theme.colors.success};
      flex-shrink: 0;
   }
`;

export const ForgotLink = styled.a`
   color: ${props => props.theme.colors.accentPrimary};
   text-decoration: none;
   font-size: 0.875rem;
   font-weight: 500;

   &:hover {
      text-decoration: underline;
   }
`;

export const LoginButton = styled.button`
   width: 100%;
   padding: 1rem;
   background: ${props => props.theme.colors.accentPrimary};
   color: white;
   border: none;
   border-radius: 8px;
   font-size: 1rem;
   font-weight: 600;
   cursor: pointer;
   transition: ${props => props.theme.transitions.default};
   display: flex;
   align-items: center;
   gap: 8px;

   &:hover {
      background: ${props => props.theme.colors.accentSecondary};
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
   }

   &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
   }
`;

export const StrengthMeter = styled.div`
  display: flex;
  gap: 4px;
  margin-top: ${({ theme }) => theme.spacing.xs};
  height: 4px;
`;

export const StrengthBar = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.colors.borderColor};
  border-radius: 2px;
  transition: ${({ theme }) => theme.transitions.default};

  &[data-active='true'] {
    background: ${({ theme, $strength }) => {
      if ($strength === 'weak') return theme.colors.error;
      if ($strength === 'medium') return theme.colors.warning;
      if ($strength === 'strong') return theme.colors.success;
      return theme.colors.borderColor;
    }};
  }
`;

export const ErrorMessage = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  color: ${({ theme }) => theme.colors.error};
  margin-top: 2px;
  display: block;
  line-height: ${({ theme }) => theme.lineHeights.tight};
`;

export const SuccessMessage = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.bodyXs};
  color: ${({ theme }) => theme.colors.success};
  margin-top: 2px;
  display: block;
  line-height: ${({ theme }) => theme.lineHeights.tight};
`;

export const SignupButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.accentPrimary};
  color: ${({ theme }) => theme.colors.bgSecondary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-family: ${({ theme }) => theme.fonts.primary};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.accentHover};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.colors.shadowMd};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.bgActive};
    color: ${({ theme }) => theme.colors.textDisabled};
    cursor: not-allowed;
    opacity: 0.6;
  }
`;