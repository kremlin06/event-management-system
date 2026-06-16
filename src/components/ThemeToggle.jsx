import styled from 'styled-components';
import { useTheme } from '../hooks/useTheme';
import { SunSVG, MoonSVG } from './SVGs';

const ToggleButton = styled.button`
  width: 38px;
  height: 38px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  background: ${({ theme }) => theme.colors.bgSecondary};
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;

  transition:
    background ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast},
    transform 0.15s ease,
    box-shadow 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.bgHover};
    color: ${({ theme }) => theme.colors.textPrimary};
    border-color: ${({ theme }) => theme.colors.borderDark};
    transform: scale(1.08);
  }

  &:active {
    transform: scale(0.95);
  }


  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accentPrimary};
    outline-offset: 2px;
  }


  &:focus:not(:focus-visible) {
    outline: none;
  }

  svg {

    transition:
      transform 0.25s ease,
      opacity 0.2s ease;
  }
`;

// Component

/**
 * ThemeToggle
 *
 * Renders a 38×38 pill button showing:
 *   - Sun icon  when the app is in DARK mode (clicking switches to light)
 *   - Moon icon when the app is in LIGHT mode (clicking switches to dark)
 *
 * Accessible:
 *   - aria-label announces the action, not the current state
 *   - Works with keyboard (Enter / Space) out of the box (it's a <button>)
 *   - Focus ring visible for keyboard users only
 *
 * Usage:
 *   <ThemeToggle />  ← drop anywhere inside <ThemeProvider>
 */
const ThemeToggle = () => {
  const { toggleTheme, isDark } = useTheme();
  const label = `Switch to ${isDark ? 'light' : 'dark'} mode`;

  return (
    <ToggleButton type="button" onClick={toggleTheme} aria-label={label} title={label}>
      {
        isDark ? (
          <SunSVG size={18} aria-hidden="true" />
        ) : (
          <MoonSVG size={18} aria-hidden="true" />
        )
      }
    </ToggleButton>
  );
};

export default ThemeToggle;
