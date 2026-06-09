// src/styles/Shared/RouteFallback.styles.js
// layout scaffolding for the Suspense route-fallback skeleton.
// mirrors the real shells (dashboard sidebar + header, auth card, marketing
// landing) so the swap from skeleton → loaded page has no layout shift.
// apple hig: the grey shimmer pulse comes from the Skeleton primitives;
// these components only provide the surrounding structure. no emojis, no spinners.

import styled from 'styled-components';

// shared scaffolding
export const FallbackShell = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bgPrimary};
`;

export const FallbackMain = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
`;

export const FallbackContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: clamp(16px, 4vw, 32px);
`;

// generic two-line stack (e.g. a title + subtitle pair)
export const FallbackStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

// header bar (shared by the dashboard shell and the marketing nav)
export const FallbackHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: clamp(12px, 3vw, 18px) clamp(16px, 4vw, 32px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
`;

export const FallbackHeaderTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-width: 0;
`;

export const FallbackHeaderControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
`;

// dashboard shell skeleton
// faux sidebar — only visible ≥1440px, exactly like the real <Sidebar>
export const FallbackSidebar = styled.aside`
  width: 240px;
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.bgSecondary};
  border-right: 1px solid ${({ theme }) => theme.colors.borderColor};
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 1439px) {
    display: none;
  }
`;

export const FallbackSidebarNav = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 4px;
`;

// 4-up metric grid — matches MetricGrid breakpoints (4 → 2 → 1)
export const FallbackCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 480px)  { grid-template-columns: 1fr; }
`;

export const FallbackCard = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

// row inside a metric card — label line on the left, icon circle on the right
export const FallbackCardRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

// large content panel — stands in for the chart / table sections
export const FallbackPanel = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: clamp(16px, 4vw, 24px);
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

// centered auth card skeleton (login / signup / password pages)
export const FallbackCenter = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bgPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(16px, 5vw, 40px);
`;

export const FallbackAuthCard = styled.div`
  width: 100%;
  max-width: 400px;
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: clamp(24px, 6vw, 40px);
  display: flex;
  flex-direction: column;
  gap: 18px;
  box-shadow: ${({ theme }) => theme.colors.shadowMd};
`;

// marketing landing skeleton (Onboarding "/" route)
export const FallbackHero = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(16px, 3vw, 24px);
  padding: clamp(32px, 8vw, 80px) clamp(16px, 5vw, 40px);
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
  text-align: center;
`;

export const FallbackHeroActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
`;
