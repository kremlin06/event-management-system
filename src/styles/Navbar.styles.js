import styled, { css } from 'styled-components';

export const Nav = styled.nav`
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   z-index: 1000;
   /* old: opaque bgSecondary made the backdrop blur do nothing.
      now use a translucent layer so the blur actually shows and content
      scrolls cleanly underneath without the header looking cut off. */
   background: ${props => props.theme.colors.navBlurBg};
   backdrop-filter: blur(12px);
   -webkit-backdrop-filter: blur(12px);
   border-bottom: 1px solid ${props => props.theme.colors.borderColor};
   box-shadow: ${props => props.theme.colors.shadowSm};
   transition: background 0.3s ease, box-shadow 0.3s ease;
`;

export const NavContainer = styled.div`
   max-width: 1200px;
   margin: 0 auto;
   padding: 1rem 2rem;
   display: flex;
   justify-content: space-between;
   align-items: center;
   gap: 1rem;

   @media (max-width: 968px) {
      padding: 1rem 1.5rem;
   }

   /* iphone 14 pro max and smaller — keep a minimum 16px gutter on the sides */
   @media (max-width: 430px) {
      padding: 0.875rem 1rem;
   }
`;

export const NavBrand = styled.div`
   display: flex;
   align-items: center;
   gap: 12px;
   text-decoration: none;
   color: ${props => props.theme.colors.textPrimary};
`;

export const BrandName = styled.span`
   /* old: fixed 1.5rem wrapped to two lines on a 430px screen, which made the
      sticky header grow taller and overlap the hero. clamp + nowrap keeps it
      on a single line across mobile → desktop. */
   font-size: clamp(1.05rem, 4.2vw, 1.5rem);
   font-weight: 400;
   letter-spacing: -0.5px;
   white-space: nowrap;
`;

export const NavLinks = styled.div`
   display: flex;
   align-items: center;
   gap: 2rem;

   @media (max-width: 968px) {
      display: none;
   }
`;

export const NavLink = styled.a`
   color: ${props => props.theme.colors.textSecondary};
   text-decoration: none;
   font-size: 0.95rem;
   font-weight: 500;
   transition: ${props => props.theme.transitions.fast};

   &:hover {
      color: ${props => props.theme.colors.textPrimary};
   }

   &.active {
      color: ${props => props.theme.colors.textPrimary};
      font-weight: 600;  
   }

   /* special style for auth page links to make them stand out */
   &[href="/login"],
   &[href="/signup"] {
      font-weight: 600;
      color: ${props => props.theme.colors.accentPrimary};
      
      &:hover {
         color: ${props => props.theme.colors.accentHover};
      }
   }
`;

export const MobileMenuBtn = styled.button`
   display: none;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   gap: 5px;
   width: 40px;
   height: 40px;
   background: none;
   border: none;
   cursor: pointer;
   padding: 8px;
   /* sit above the slide-down menu so the bars can morph into the close (X) */
   position: relative;
   z-index: 1002;

   span {
      display: block;
      width: 24px;
      height: 2px;
      border-radius: 2px;
      background: ${props => props.theme.colors.textPrimary};
      transition: ${props => props.theme.transitions.default};
      transform-origin: center;
   }

   /* animate the three bars into an X when the menu is open */
   ${({ $open }) => $open && css`
      span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
      span:nth-child(2) { opacity: 0; }
      span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
   `}

   @media (max-width: 968px) {
      display: flex;
   }
`;

// dimmed click-catcher behind the mobile menu — tapping it closes the menu
export const MobileMenuOverlay = styled.div`
   display: none;

   @media (max-width: 968px) {
      display: block;
      position: fixed;
      inset: 0;
      z-index: 998;
      background: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(2px);
      -webkit-backdrop-filter: blur(2px);
      opacity: ${({ $open }) => ($open ? '1' : '0')};
      pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
      transition: opacity 0.3s ease;
   }
`;

// full-width panel that slides down from under the fixed navbar on mobile
export const MobileMenu = styled.div`
   display: none;

   @media (max-width: 968px) {
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      /* clear the fixed navbar height, then breathing room below */
      padding: calc(64px + 0.75rem) 1.25rem 1.5rem;
      background: ${props => props.theme.colors.navBg};
      border-bottom: 1px solid ${props => props.theme.colors.borderColor};
      box-shadow: ${props => props.theme.colors.shadowLg};
      transform: translateY(${({ $open }) => ($open ? '0' : '-100%')});
      opacity: ${({ $open }) => ($open ? '1' : '0')};
      pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
      transition: transform 0.32s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.32s ease;

      /* text links become full-width, comfortably tappable rows */
      ${NavLink} {
         width: 100%;
         padding: 0.9rem 0.25rem;
         font-size: 1.05rem;
         color: ${props => props.theme.colors.textPrimary};
         border-bottom: 1px solid ${props => props.theme.colors.borderColor};
      }

      /* the CTA renders as a styled Button (not a NavLink) — stretch it into a
         full-width tap target and separate it from the link list */
      > *:not(${NavLink}) {
         width: 100%;
         margin-top: 1rem;
      }
   }

   @media (min-width: 969px) {
      display: none;
   }
`;
