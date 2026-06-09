import styled, { css } from 'styled-components';

// we use a CSS block for shared styles to keep the code DRY (Don't Repeat Yourself)
const baseButtonStyles = css`
  /* layout and spacing */
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border-radius: 8px;
  display: inline-block;

  /* typography */
  color: ${props => props.theme.colors.textPrimary};
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  text-align: center;

  /* interaction */
  cursor: pointer;
  transition: ${props => props.theme.transitions.default};

  /* reset */
  border: none;
 
  &:hover {
    transform: translateY(0);
  }
`;

// the primary button with solid background, which is a styled component
export const StyledButton = styled.button`
   ${baseButtonStyles}
   background-color: ${props => props.theme.colors.accentPrimary};
   /* always white text on the solid blue fill — fixes the black-on-blue contrast bug
      (base color was textPrimary, which is near-black in light mode) */
   color: ${props => props.theme.colors.textOnAccent};

   &:hover {
      /* old: background-color: accentSecondary — that token is GRAY in light mode,
         which made a hovered button look disabled. now darken/brighten the blue
         via accentHover and keep the lift + glow for clear "clickable" feedback. */
      background-color: ${props => props.theme.colors.accentHover};
      color: ${props => props.theme.colors.textOnAccent};
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
   }

   /* keyboard accessibility — visible focus ring (WCAG) */
   &:focus-visible {
      outline: 2px solid ${props => props.theme.colors.accentPrimary};
      outline-offset: 2px;
   }

   &:active {
      transform: translateY(0);
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
   }
`;

  /* the secondary button with transparent background and border */
export const StyledSecondaryButton = styled.button`
   ${baseButtonStyles}
   background: transparent;
   /* dark/readable text on the light, transparent fill */
   color: ${props => props.theme.colors.textPrimary};
   border: 1px solid ${props => props.theme.colors.borderColor};

   &:hover {
      background: ${props => props.theme.colors.bgTertiary};
      border-color: ${props => props.theme.colors.accentPrimary};
      color: ${props => props.theme.colors.accentPrimary};
      transform: translateY(-2px);
   }

   &:focus-visible {
      outline: 2px solid ${props => props.theme.colors.accentPrimary};
      outline-offset: 2px;
   }

   &:active {
      transform: translateY(0);
   }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
`;