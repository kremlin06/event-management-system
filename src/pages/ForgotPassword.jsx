import { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPasswordApi } from '../services/auth';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';
import ToastNotification from '../components/ToastNotification';
import ToastContainer from '../components/ToastContainer';
import { FormGroup, FormLabel, FormInput } from '../styles/Form.styles';
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

// Inline checkmark SVG — avoids importing the full SVGs bundle just for this icon
const CheckCircleSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const ForgotPassword = () => {
  const [email, setEmail]         = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false); // show success state after submit
  const [toast, setToast]         = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await forgotPasswordApi({ email });
      // Always show the success state — we never reveal whether the email exists.
      setSubmitted(true);
    } catch (err) {
      // Network error or unexpected 500; everything else returns 200 generically.
      setToast({
        type: 'error',
        message: err.response?.data?.error?.message ?? 'Something went wrong. Please try again.',
      });
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
          {submitted ? (
            // Success state
            <SuccessCard>
              <SuccessIcon>
                <CheckCircleSVG />
              </SuccessIcon>
              <SuccessTitle>Check your inbox</SuccessTitle>
              <SuccessText>
                If an account is registered with <strong>{email}</strong>, you'll
                receive a password reset link within a few minutes.
              </SuccessText>
              <AuthFooter>
                <Link to="/login">Back to Login</Link>
              </AuthFooter>
            </SuccessCard>
          ) : (
            // Request form
            <>
              <AuthHeading>Forgot Password?</AuthHeading>
              <AuthSubheading>
                Enter the email address linked to your account and we'll send
                you a link to reset your password.
              </AuthSubheading>

              <AuthForm onSubmit={handleSubmit}>
                <FormGroup>
                  <FormLabel htmlFor="email">Email Address</FormLabel>
                  <FormInput
                    type="email"
                    id="email"
                    placeholder="Enter your registered email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    autoFocus
                  />
                </FormGroup>

                <AuthButton type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <LoadingSpinner />
                      <span>Sending...</span>
                    </>
                  ) : (
                    'Send Reset Link'
                  )}
                </AuthButton>
              </AuthForm>

              <AuthFooter>
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

export default ForgotPassword;
