// src/styles/LearnMore.styles.js
// styles for the onboarding "Learn More" educational section.
// apple hig: deference + clarity. frosted glassmorphism info cards sit over a
// soft accent glow so the content (not the chrome) leads. everything is driven
// by theme tokens, uses clamp() fluid typography, and reflows to a single
// column with 16px side gutters at ≤414px so there is no horizontal scroll.

import styled from 'styled-components';

export const LearnMoreSection = styled.section`
   position: relative;
   width: 100%;
   padding: clamp(3.5rem, 8vw, 7rem) clamp(1rem, 4vw, 2rem);
   background: ${props => props.theme.colors.bgSecondary};
   overflow: hidden;
   /* skip rendering until scrolled near */
   content-visibility: auto;
   contain-intrinsic-size: 0 2000px;
   /* offset the fixed navbar when the "Learn More" anchor scrolls here */
   scroll-margin-top: 80px;

   /* soft accent halo so the frosted cards read as real glass */
   &::before {
      content: '';
      position: absolute;
      top: -120px;
      left: 50%;
      transform: translateX(-50%);
      width: min(900px, 120%);
      height: 460px;
      background: radial-gradient(closest-side, ${props => props.theme.colors.glassGlow}, transparent);
      filter: blur(30px);
      pointer-events: none;
      z-index: 0;
   }
`;

export const Container = styled.div`
   position: relative;
   z-index: 1;
   max-width: 1120px;
   margin: 0 auto;
`;

// intro / overview
export const SectionHeader = styled.header`
   text-align: center;
   max-width: 800px;
   margin: 0 auto clamp(2.5rem, 6vw, 4rem);
`;

export const Eyebrow = styled.span`
   display: inline-block;
   font-size: clamp(0.75rem, 2vw, 0.85rem);
   font-weight: 700;
   letter-spacing: 0.08em;
   text-transform: uppercase;
   color: ${props => props.theme.colors.accentPrimary};
   margin-bottom: 0.75rem;
`;

export const Title = styled.h2`
   font-size: clamp(1.75rem, 5vw, 2.75rem);
   font-weight: 700;
   line-height: 1.15;
   margin-bottom: 1rem;
   text-wrap: balance;
`;

export const Lede = styled.p`
   font-size: clamp(1rem, 2.5vw, 1.2rem);
   line-height: 1.7;
   color: ${props => props.theme.colors.textSecondary};
   text-wrap: balance;
`;

// emphasised inline metric (e.g. "≥95%", "<2s", "10,000")
export const Highlight = styled.span`
   color: ${props => props.theme.colors.accentPrimary};
   font-weight: 600;
   white-space: nowrap;
`;

// group sub-heading (What it does / By role / System readiness / Phase 1)
export const SubHeading = styled.h3`
   font-size: clamp(1.25rem, 3.5vw, 1.75rem);
   font-weight: 700;
   text-align: center;
   margin: clamp(2.5rem, 6vw, 4rem) 0 clamp(1.5rem, 4vw, 2rem);
`;

// responsive grids
export const FeatureGrid = styled.div`
   display: grid;
   grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
   gap: clamp(1rem, 3vw, 1.5rem);

   @media (max-width: 414px) {
      grid-template-columns: 1fr;
   }
`;

export const RoleGrid = styled(FeatureGrid)`
   grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));

   /* re-assert single column — this override comes after FeatureGrid's own
      ≤414px rule, so it must restate it to keep narrow phones from side-scrolling */
   @media (max-width: 414px) {
      grid-template-columns: 1fr;
   }
`;

export const SpecGrid = styled(FeatureGrid)`
   grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));

   @media (max-width: 414px) {
      grid-template-columns: 1fr;
   }
`;

// frosted glass card
export const GlassCard = styled.div`
   position: relative;
   display: flex;
   flex-direction: column;
   gap: 0.85rem;
   padding: clamp(1.25rem, 3vw, 2rem);
   border-radius: ${props => props.theme.borderRadius.xl};
   background: ${props => props.theme.colors.glassBg};
   backdrop-filter: blur(16px) saturate(140%);
   -webkit-backdrop-filter: blur(16px) saturate(140%);
   border: 1px solid ${props => props.theme.colors.glassBorder};
   box-shadow: ${props => props.theme.colors.shadowMd};
   transition: ${props => props.theme.transitions.default};

   &:hover {
      transform: translateY(-4px);
      box-shadow: ${props => props.theme.colors.shadowLg};
      border-color: ${props => props.theme.colors.accentPrimary};
   }

   h4 {
      font-size: clamp(1.05rem, 2.5vw, 1.2rem);
      font-weight: 600;
   }

   p {
      font-size: clamp(0.9rem, 2.2vw, 0.975rem);
      line-height: 1.65;
      color: ${props => props.theme.colors.textSecondary};
   }
`;

// gradient icon chip sitting at the top of each card
export const CardIcon = styled.div`
   width: 48px;
   height: 48px;
   border-radius: ${props => props.theme.borderRadius.lg};
   display: flex;
   align-items: center;
   justify-content: center;
   background: ${props => props.theme.gradients.accentGradient};
   color: ${props => props.theme.colors.textOnAccent};
   flex-shrink: 0;
`;

// role card header (icon + role label)
export const RoleHeader = styled.div`
   display: flex;
   align-items: center;
   gap: 0.85rem;

   h4 {
      font-size: clamp(1.1rem, 2.6vw, 1.3rem);
   }
`;

export const BenefitList = styled.ul`
   list-style: none;
   display: flex;
   flex-direction: column;
   gap: 0.75rem;
   margin-top: 0.25rem;
`;

export const BenefitItem = styled.li`
   display: flex;
   align-items: flex-start;
   gap: 0.6rem;
   font-size: clamp(0.9rem, 2.2vw, 0.975rem);
   line-height: 1.55;
   color: ${props => props.theme.colors.textSecondary};

   svg {
      color: ${props => props.theme.colors.success};
      flex-shrink: 0;
      margin-top: 2px;
   }
`;

// phase 1 scope / limitations card
// muted dashed treatment signals "current boundary / out of scope"
export const LimitationCard = styled(GlassCard)`
   gap: 1.1rem;
   border-style: dashed;
   border-color: ${props => props.theme.colors.borderDark};

   &:hover {
      transform: none;
      border-color: ${props => props.theme.colors.borderDark};
      box-shadow: ${props => props.theme.colors.shadowMd};
   }
`;

export const LimitationItem = styled.div`
   display: flex;
   align-items: flex-start;
   gap: 0.75rem;

   svg {
      color: ${props => props.theme.colors.textTertiary};
      flex-shrink: 0;
      margin-top: 3px;
   }

   strong {
      color: ${props => props.theme.colors.textPrimary};
      font-weight: 600;
   }

   span {
      font-size: clamp(0.9rem, 2.2vw, 0.975rem);
      line-height: 1.6;
      color: ${props => props.theme.colors.textSecondary};
   }
`;

// bottom call-to-action
export const CtaPanel = styled.div`
   margin-top: clamp(2.5rem, 6vw, 4rem);
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: 1.25rem;
   text-align: center;

   h3 {
      font-size: clamp(1.5rem, 4vw, 2rem);
      font-weight: 700;
   }

   p {
      max-width: 560px;
      font-size: clamp(0.95rem, 2.4vw, 1.1rem);
      line-height: 1.7;
      color: ${props => props.theme.colors.textSecondary};
   }
`;

// wrapper so the CTA button can host an inline arrow icon
export const CtaButtonInner = styled.span`
   display: inline-flex;
   align-items: center;
   gap: 0.5rem;
`;
