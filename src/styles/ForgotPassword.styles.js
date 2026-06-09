import styled from 'styled-components';

// The forgot-password and reset-password pages share a simple centered-card
// layout — no two-column split like Login/Signup.
// Most structural styles are reused from Login.styles.js; only divergences live here.

export const AuthPageContainer = styled.div`
   background: ${({ theme }) => theme.colors.bgPrimary};
   min-height: 100vh;
`;

export const AuthContainer = styled.div`
   min-height: 100vh;
   display: flex;
   align-items: center;
   justify-content: center;
   padding: 6rem 2rem 2rem;
`;

export const AuthBox = styled.div`
   background: ${({ theme }) => theme.colors.bgSecondary};
   padding: 3rem;
   border-radius: 16px;
   border: 1px solid ${({ theme }) => theme.colors.borderColor};
   width: 100%;
   max-width: 440px;

   @media (max-width: 640px) {
      padding: 2rem 1.5rem;
   }
`;

export const AuthHeading = styled.h2`
   font-size: 1.75rem;
   font-weight: 600;
   margin-bottom: 0.75rem;
   text-align: center;
`;

export const AuthSubheading = styled.p`
   font-size: 0.9375rem;
   color: ${({ theme }) => theme.colors.textSecondary};
   text-align: center;
   margin-bottom: 2rem;
   line-height: 1.6;
`;

export const AuthForm = styled.form`
   display: flex;
   flex-direction: column;
   gap: 1.5rem;
`;

export const AuthFooter = styled.div`
   margin-top: 1.75rem;
   text-align: center;
   font-size: 0.875rem;
   color: ${({ theme }) => theme.colors.textSecondary};

   a {
      color: ${({ theme }) => theme.colors.accentPrimary};
      text-decoration: none;
      font-weight: 600;

      &:hover {
         text-decoration: underline;
      }
   }
`;

// Success state shown after the request is submitted
export const SuccessCard = styled.div`
   text-align: center;
   padding: 1rem 0;
`;

export const SuccessIcon = styled.div`
   width: 64px;
   height: 64px;
   border-radius: 50%;
   background: ${({ theme }) => theme.colors.success}20;
   color: ${({ theme }) => theme.colors.success};
   display: flex;
   align-items: center;
   justify-content: center;
   margin: 0 auto 1.25rem;

   svg {
      width: 32px;
      height: 32px;
   }
`;

export const SuccessTitle = styled.h3`
   font-size: 1.25rem;
   font-weight: 600;
   margin-bottom: 0.75rem;
`;

export const SuccessText = styled.p`
   font-size: 0.9375rem;
   color: ${({ theme }) => theme.colors.textSecondary};
   line-height: 1.6;
   margin-bottom: 1.5rem;
`;

// Reusable submit button (matches LoginButton shape)
export const AuthButton = styled.button`
   width: 100%;
   padding: 1rem;
   background: ${({ theme }) => theme.colors.accentPrimary};
   color: white;
   border: none;
   border-radius: 8px;
   font-size: 1rem;
   font-weight: 600;
   cursor: pointer;
   transition: ${({ theme }) => theme.transitions.default};
   display: flex;
   align-items: center;
   justify-content: center;
   gap: 8px;

   &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.accentSecondary};
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
