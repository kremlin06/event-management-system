import styled from 'styled-components';

export const HowItWorksSection = styled.section`
   padding: 6rem 2rem;
   background: ${props => props.theme.colors.bgPrimary};
   /* skip rendering until scrolled near — same reason as FeaturesSection */
   content-visibility: auto;
   contain-intrinsic-size: 0 500px;

   @media (max-width: 968px) {
      padding: 4rem 1.5rem;
   }
`;

export const Container = styled.div`
   max-width: 1200px;
   margin: 0 auto;
`;

export const SectionTitle = styled.h2`
   font-size: 2.5rem;
   font-weight: 700;
   text-align: center;
   margin-bottom: 1rem;

   @media (max-width: 640px) {
      font-size: 1.75rem;
   }
`;

export const Steps = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: center;
   /* old: align-items: center centered the short connectors in the middle of the
      row; stretch makes all three step columns equal height instead. */
   align-items: stretch;
   gap: 2rem;
   margin-top: 4rem;
   /* old: flex-wrap: wrap let step 3 drop to a second line on iPad Pro (the
      triangular layout). removed so the three steps stay on one row down to 768px,
      where we switch to a clean vertical stack. */

   @media (max-width: 1024px) {
      gap: 1.5rem;
   }

   @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
      gap: 2.5rem;
   }
`;

export const Step = styled.div`
   text-align: center;
   /* flex-basis 0 + min-width 0 lets the three columns share width evenly and
      shrink to fit the tablet row instead of forcing an overflow + wrap. */
   flex: 1 1 0;
   min-width: 0;
   max-width: 300px;
   display: flex;
   flex-direction: column;
   align-items: center;

   @media (max-width: 768px) {
      width: 100%;
      max-width: 340px;
   }

   h3 {
      font-size: 1.25rem;
      margin-bottom: 0.75rem;
   }

   p {
      color: ${props => props.theme.colors.textSecondary};
   }
`;

export const StepNumber = styled.div`
   width: 64px;
   height: 64px;
   background: ${props => props.theme.colors.accentPrimary};
   border-radius: 50%;
   display: flex;
   align-items: center;
   justify-content: center;
   font-size: 1.5rem;
   font-weight: 700;
   margin: 0 auto 1.5rem;
`;

export const StepConnector = styled.div`
   /* old: fixed width: 100px made the connectors rigid, which (with the steps'
      old min-width) overflowed the iPad row and forced wrapping. now the line
      flexes/shrinks to fill the space between steps. */
   flex: 1 1 40px;
   min-width: 24px;
   max-width: 100px;
   height: 2px;
   /* pin the line to the vertical center of the 64px step-number circle
      (32px) rather than the middle of the full-height column */
   align-self: flex-start;
   margin-top: 31px;
   background: ${props => props.theme.colors.borderColor};

   /* visible on tablet + desktop, hidden once the steps stack vertically */
   @media (max-width: 768px) {
      display: none;
   }
`;
