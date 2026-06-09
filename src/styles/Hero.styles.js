import styled from 'styled-components';

export const HeroSection = styled.section`
   width: 100%;
   min-height: 100vh;
   display: flex;
   align-items: center;
   padding: 0;
   background: ${props => props.theme.colors.bgPrimary};
   overflow: hidden;
`;

export const HeroContainer = styled.div`
   width: 100%;
   max-width: 2560px;
   margin: 0 auto;
   padding: 0 3rem;
   display: grid;
   grid-template-columns: 1fr 1.2fr;
   gap: 4rem;
   padding: 8rem 2rem 4rem;
   align-items: center;

   @media (max-width: 1024px) {
      grid-template-columns: 1fr;
      gap: 3rem;
      padding: 7rem 1.5rem 3rem;
   }

   @media (max-width: 768px) {
      gap: 2.5rem;
      padding: 6rem 1.5rem 3rem;
   }

   @media (max-width: 640px) {
      padding: 5rem 1.25rem 2.5rem;
   }

   /* iphone 14 pro max and below — 16px side gutters, still clears the fixed nav */
   @media (max-width: 430px) {
      padding: 4.5rem 1rem 2rem;
      gap: 2rem;
   }
`;

export const HeroContent = styled.div`
   animation: fadeInUp 0.8s ease;
   position: relative;
   z-index: 2;

   /* on mobile the animation delay pushes the LCP element's first visible paint
      to 0.8s+ after load, directly hurting the LCP score. skip the animation
      entirely on narrow screens so the heading is visible on the very first frame. */
   @media (max-width: 430px) {
      animation: none;
   }

   @media (max-width: 1024px) {
      text-align: center;
   }
`;

export const HeroTitle = styled.h1`
   font-size: 3.5rem;
   font-weight: 700;
   line-height: 1.1;
   margin-bottom: 1.5rem;
   letter-spacing: -0.02em;
   text-wrap: balance;
   background: ${props => props.theme.gradients.textGradient};
   -webkit-background-clip: text;
   -webkit-text-fill-color: transparent;
   background-clip: text;

   @media (max-width: 1024px) {
      font-size: 3rem;
   }

   @media (max-width: 768px) {
      font-size: 2.5rem;
   }

   @media (max-width: 640px) {
      font-size: 2rem;
      margin-bottom: 1.25rem;
   }
`;

export const HeroSubtitle = styled.p`
   font-size: 1.25rem;
   color: ${props => props.theme.colors.textSecondary};
   margin-bottom: 2.5rem;
   line-height: 1.7;
   text-wrap: balance;

   @media (max-width: 1024px) {
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
   }

   @media (max-width: 768px) {
      font-size: 1.125rem;
      margin-bottom: 2rem;
   }

   @media (max-width: 640px) {
      font-size: 1rem;
      margin-bottom: 1.75rem;
   }
`;

export const HeroButtons = styled.div`
   display: flex;
   gap: 1.25rem;
   flex-wrap: wrap;
   align-items: center;

   @media (max-width: 1024px) {
      justify-content: center;
   }

   @media (max-width: 640px) {
      flex-direction: column;
      width: 100%;
      gap: 1rem;
   }
`;

export const HeroMockup = styled.div`
   animation: fadeInUp 0.8s ease 0.2s both;
   /* the 0.2s delay means the mockup (the LCP element on mobile since it renders
      first via order:-1) is invisible for 0.2s before it starts fading in.
      on mobile, cut both the delay and the animation to paint immediately. */
   @media (max-width: 430px) {
      animation: none;
   }
   perspective: 1000px;
   
   @media (max-width: 1024px) {
      order: -1;
      max-width: 600px;
      margin: 0 auto;
   }

   @media (max-width: 640px) {
      max-width: 100%;
   }
`;

export const MockupWindow = styled.div`
   background: ${props => props.theme.colors.bgSecondary};
   border-radius: 16px;
   overflow: hidden;
   border: 1px solid ${props => props.theme.colors.borderColor};
   box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
   transform: perspective(1000px) rotateY(-5deg) rotateX(2deg);
   transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease;

   &:hover {
      transform: perspective(1000px) rotateY(0deg) rotateX(0deg);
      box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.6);
   }

   @media (max-width: 1024px) {
      transform: none;
      
      &:hover {
         transform: none;
      }
   }
`;

export const WindowHeader = styled.div`
   background: ${props => props.theme.colors.bgTertiary};
   padding: 12px 16px;
   display: flex;
   align-items: center;
   justify-content: space-between;
   border-bottom: 1px solid ${props => props.theme.colors.borderColor};
`;

export const WindowControls = styled.div`
   display: flex;
   gap: 8px;
`;

export const Control = styled.span`
   width: 12px;
   height: 12px;
   border-radius: 50%;
   background-color: ${props => {
      switch (props.type) {
         case 'close': return '#ef4444';
         case 'minimize': return '#eab308';
         case 'maximize': return '#22c55e';
         default: return '#999';
      }
   }};
`;

export const WindowTitle = styled.div`
   font-size: 0.875rem;
   color: ${props => props.theme.colors.textSecondary};
   font-weight: 500;
`;

export const WindowTime = styled.div`
   font-size: 0.875rem;
   color: ${props => props.theme.colors.textTertiary};
`;

export const WindowContent = styled.div`
   background: ${props => props.theme.gradients.mockupGradient};
   padding: 3rem;
   min-height: 400px;

   /* old: flat 3rem padding crammed the mockup contents on small screens */
   @media (max-width: 768px) {
      padding: 2rem;
      min-height: 0;
   }

   @media (max-width: 430px) {
      padding: 1.5rem;
   }
`;

export const MockupDashboard = styled.div`
   display: grid;
   grid-template-columns: 200px 1fr;
   gap: 2rem;

   @media (max-width: 768px) {
      grid-template-columns: 1fr;
   }
`;

export const MockupSidebar = styled.div`
   background: rgba(255, 255, 255, 0.1);
   backdrop-filter: blur(12px);
   -webkit-backdrop-filter: blur(12px);
   border-radius: 12px;
   padding: 1rem;
   border: 1px solid rgba(255, 255, 255, 0.15);

   @media (max-width: 768px) {
      display: none;
   }
`;

export const SidebarItem = styled.div`
   padding: 0.75rem 1rem;
   margin-bottom: 0.5rem;
   border-radius: 8px;
   font-size: 0.875rem;
   color: rgba(255, 255, 255, 0.85);
   cursor: pointer;
   transition: all 0.2s ease;
   background: rgba(255, 255, 255, 0.05);
   border: 1px solid transparent;

   &:hover {
      background: rgba(255, 255, 255, 0.15);
      color: white;
      border-color: rgba(255, 255, 255, 0.2);
      transform: translateX(4px);
   }

   &.active {
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border-color: rgba(255, 255, 255, 0.3);
      font-weight: 600;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
   }
`;

export const MockupMain = styled.div`
   background: rgba(255, 255, 255, 0.1);
   backdrop-filter: blur(12px);
   -webkit-backdrop-filter: blur(12px);
   border-radius: 12px;
   padding: 2rem;
   border: 1px solid rgba(255, 255, 255, 0.15);

   @media (max-width: 430px) {
      padding: 1.25rem;
      /* disable backdrop-filter on mobile — it forces a separate GPU compositing
         layer for every blurred element and is the single biggest paint cost on
         mobile hardware. use a slightly more opaque solid fill instead so the
         glass appearance is preserved without the blur penalty. */
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: rgba(255, 255, 255, 0.18);
   }
`;

export const MockupHeader = styled.div`
   h3 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
      color: white;
      font-weight: 600;
   }

   p {
      color: rgba(255, 255, 255, 0.85);
      font-size: 0.875rem;
   }
`;

export const MockupStats = styled.div`
   display: grid;
   grid-template-columns: repeat(3, 1fr);
   gap: 1rem;
   margin-top: 2rem;

   @media (max-width: 640px) {
      grid-template-columns: 1fr;
   }
`;

export const StatCard = styled.div`
   background: rgba(255, 255, 255, 0.15);
   backdrop-filter: blur(8px);
   -webkit-backdrop-filter: blur(8px);
   padding: 1.5rem;
   border-radius: 12px;
   text-align: center;
   border: 1px solid rgba(255, 255, 255, 0.2);
   transition: transform 0.2s ease, background 0.2s ease;

   /* three stat cards × backdrop-filter = three compositing layers on mobile.
      same fix as MockupMain: disable blur, use opaque fill. */
   @media (max-width: 430px) {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: rgba(255, 255, 255, 0.22);
   }

   &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
   }
`;

export const StatNumber = styled.div`
   font-size: 2rem;
   font-weight: 700;
   color: white;
   margin-bottom: 0.5rem;
   letter-spacing: -0.02em;
`;

export const StatLabel = styled.div`
   font-size: 0.75rem;
   color: rgba(255, 255, 255, 0.85);
   font-weight: 500;
`;