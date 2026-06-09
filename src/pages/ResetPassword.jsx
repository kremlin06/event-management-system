import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { resetPasswordApi } from '../services/auth';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';
import ToastNotification from '../components/ToastNotification';
import ToastContainer from '../components/ToastContainer';
import { EyeSVG, EyeOffSVG } from '../components/SVGs';
import { FormGroup, FormLabel, FormInput, FormInputWrapper, PasswordToggle, ErrorMessage } from '../styles/Form.styles';
import {
  AuthPageContainer,
  AuthContainer,
  AuthBox,
  AuthHeading,
  AuthSubheading,
  AuthForm,
  AuthFooter,
  AuthButton,
  SuccessCard,
  SuccessIcon,
  SuccessTitle,
  SuccessText,
} from '../styles/ForgotPassword.styles';

const CheckCircleSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

// Lightweight password strength check — mirrors backend Joi rules
const getStrength = (pw) => {
  if (!pw) return null;
  const hasUpper  = /[A-Z]/.test(pw);
  const hasNumber = /[0-9]/.test(pw);
  const isLong    = pw.length >= 10;
  const score     = [hasUpper, hasNumber, pw.length >= 8, isLong].filter(Boolean).length;
  if (score <= 2) return 'weak';
  if (score === 3) return 'medium';
  return 'strong';
};

const STRENGTH_COLORS = { weak: 'var(--color-error, #ef4444)', medium: '#f59e0b', strong: '#22c55e' };
const STRENGTH_LABELS = { weak: 'Weak', medium: 'Medium', strong: 'Strong' };

const ResetPassword = () => {
  const { token }   = useParams();   // raw hex token from /reset-password/:token
  const navigate    = useNavigate();

  const [newPassword, setNewPassword]           = useState('');
  const [confirmPassword, setConfirmPassword]   = useState('');
  const [showPassword, setShowPassword]         = useState(false);
  const [showConfirm, setShowConfirm]           = useState(false);
  const [isLoading, setIsLoading]               = useState(false);
  const [success, setSuccess]                   = useState(false);
  const [errors, setErrors]                     = useState({});
  const [toast, setToast]                       = useState(null);

  const strength = getStrength(newPassword);

  const validate = () => {
    const errs = {};
    if (newPassword.length < 8)           errs.newPassword = 'Password must be at least 8 characters';
    else if (!/[A-Z]/.test(newPassword))  errs.newPassword = 'Password must contain at least one uppercase letter';
    else if (!/[0-9]/.test(newPassword))  errs.newPassword = 'Password must contain at least one number';
    if (newPassword !== confirmPassword)  errs.confirmPassword = 'Passwords do not match';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsLoading(true);

    try {
      await resetPasswordApi({ token, newPassword });
      setSuccess(true);
      // Give the user 2.5 s to read the success message then auto-redirect.
      setTimeout(() => navigate('/login', { replace: true }), 2500);
    } catch (err) {
      const msg = err.response?.data?.error?.message
        ?? 'Something went wrong. Please request a new reset link.';
      setToast({ type: 'error', message: msg });
    } finally {
      setIsLoading(false);
    }
  };

  const closeToast = () => setToast(null);

  return (
    <AuthPageContainer>
      <Navbar />
      <AuthContainer>
        <AuthBox>
          {success ? (
            // Success state
            <SuccessCard>
              <SuccessIcon>
                <CheckCircleSVG />
              </SuccessIcon>
              <SuccessTitle>Password Updated!</SuccessTitle>
              <SuccessText>
                Your password has been changed. You'll be redirected to the login
                page in a moment.
              </SuccessText>
              <AuthFooter>
                <Link to="/login">Go to Login</Link>
              </AuthFooter>
            </SuccessCard>
          ) : (
            // Reset form
            <>
              <AuthHeading>Set New Password</AuthHeading>
              <AuthSubheading>
                Choose a strong password with at least 8 characters, one uppercase
                letter, and one number.
              </AuthSubheading>

              <AuthForm onSubmit={handleSubmit}>
                {/* New password */}
                <FormGroup>
                  <FormLabel htmlFor="newPassword">New Password</FormLabel>
                  <FormInputWrapper>
                    <FormInput
                      type={showPassword ? 'text' : 'password'}
                      id="newPassword"
                      placeholder="Create a new password"
                      value={newPassword}
                      onChange={(e) => { setNewPassword(e.target.value); setErrors(prev => ({ ...prev, newPassword: undefined })); }}
                      required
                      $hasToggle
                      $hasError={!!errors.newPassword}
                      autoComplete="new-password"
                      autoFocus
                    />
                    <PasswordToggle
                      type="button"
                      onClick={() => setShowPassword(p => !p)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOffSVG /> : <EyeSVG />}
                    </PasswordToggle>
                  </FormInputWrapper>

                  {/* Strength bar */}
                  {newPassword && strength && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                      <div style={{ display: 'flex', gap: '4px', flex: 1, height: '4px' }}>
                        {['weak', 'medium', 'strong'].map((level, i) => {
                          const levels = { weak: 1, medium: 2, strong: 3 };
                          const active = levels[strength] > i;
                          return (
                            <div
                              key={level}
                              style={{
                                flex: 1,
                                height: '4px',
                                borderRadius: '2px',
                                background: active ? STRENGTH_COLORS[strength] : 'var(--border-color)',
                                transition: 'background 0.2s',
                              }}
                            />
                          );
                        })}
                      </div>
                      <span style={{ fontSize: '0.75rem', color: STRENGTH_COLORS[strength], fontWeight: 500 }}>
                        {STRENGTH_LABELS[strength]}
                      </span>
                    </div>
                  )}
                  {errors.newPassword && <ErrorMessage>{errors.newPassword}</ErrorMessage>}
                </FormGroup>

                {/* Confirm password */}
                <FormGroup>
                  <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                  <FormInputWrapper>
                    <FormInput
                      type={showConfirm ? 'text' : 'password'}
                      id="confirmPassword"
                      placeholder="Re-enter your new password"
                      value={confirmPassword}
                      onChange={(e) => { setConfirmPassword(e.target.value); setErrors(prev => ({ ...prev, confirmPassword: undefined })); }}
                      required
                      $hasToggle
                      $hasError={!!errors.confirmPassword}
                      autoComplete="new-password"
                    />
                    <PasswordToggle
                      type="button"
                      onClick={() => setShowConfirm(p => !p)}
                      aria-label={showConfirm ? 'Hide password' : 'Show password'}
                    >
                      {showConfirm ? <EyeOffSVG /> : <EyeSVG />}
                    </PasswordToggle>
                  </FormInputWrapper>
                  {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
                </FormGroup>

                <AuthButton type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <LoadingSpinner />
                      <span>Updating...</span>
                    </>
                  ) : (
                    'Update Password'
                  )}
                </AuthButton>
              </AuthForm>

              <AuthFooter>
                <Link to="/forgot-password">Request a new link</Link>
                {' · '}
                <Link to="/login">Back to Login</Link>
              </AuthFooter>
            </>
          )}
        </AuthBox>
      </AuthContainer>

      {toast && (
        <ToastContainer>
          <ToastNotification message={toast.message} type={toast.type} onClose={closeToast} />
        </ToastContainer>
      )}
    </AuthPageContainer>
  );
};

export default ResetPassword;
