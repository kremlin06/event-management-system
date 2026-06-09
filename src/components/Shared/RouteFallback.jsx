// src/components/Shared/RouteFallback.jsx
// Skeleton shown by the <Suspense> boundary while a lazy route chunk downloads.
// Replaces the old plain dark <div> with an apple-hig skeleton: subtle grey
// shimmer pulses (from the Skeleton primitives), no spinners, no emojis, and
// layout that mirrors the real page so there is no jarring shift on swap-in.
//
// variant:
//   "dashboard" (default) → sidebar + header + metric cards + content panel
//   "auth"                → centered card (login, signup, password pages)
//   "marketing"           → top nav + centered hero (Onboarding landing)

import * as F from '../../styles/Shared/RouteFallback.styles';
import { SkeletonLine, SkeletonBlock, SkeletonCircle } from './Skeleton';

// auth card skeleton
const AuthFallback = () => (
  <F.FallbackCenter role="status" aria-busy="true" aria-label="Loading page">
    <F.FallbackAuthCard>
      <SkeletonCircle $size="48px" />
      <SkeletonLine $h="22px" $w="60%" $mb="0" />
      <SkeletonLine $h="12px" $w="85%" $mb="0" />
      {/* faux input fields + submit button */}
      <SkeletonBlock $h="44px" $r="8px" />
      <SkeletonBlock $h="44px" $r="8px" />
      <SkeletonBlock $h="44px" $r="8px" />
    </F.FallbackAuthCard>
  </F.FallbackCenter>
);

// marketing landing skeleton
const MarketingFallback = () => (
  <F.FallbackShell role="status" aria-busy="true" aria-label="Loading page">
    <F.FallbackMain>
      {/* top nav bar — brand on the left, links + cta on the right */}
      <F.FallbackHeader aria-hidden="true">
        <SkeletonLine $h="20px" $w="160px" $mb="0" />
        <F.FallbackHeaderControls>
          <SkeletonLine $h="14px" $w="56px" $mb="0" />
          <SkeletonLine $h="14px" $w="56px" $mb="0" />
          <SkeletonBlock $h="36px" $w="96px" $r="8px" />
        </F.FallbackHeaderControls>
      </F.FallbackHeader>

      {/* centered hero — title lines, subtitle, two cta buttons, hero block */}
      <F.FallbackHero aria-hidden="true">
        <SkeletonLine $h="clamp(32px, 7vw, 52px)" $w="80%" $mb="0" />
        <SkeletonLine $h="clamp(32px, 7vw, 52px)" $w="55%" $mb="0" />
        <SkeletonLine $h="16px" $w="70%" $mb="0" />
        <F.FallbackHeroActions>
          <SkeletonBlock $h="46px" $w="150px" $r="8px" />
          <SkeletonBlock $h="46px" $w="150px" $r="8px" />
        </F.FallbackHeroActions>
        <SkeletonBlock $h="clamp(180px, 30vw, 300px)" $r="16px" />
      </F.FallbackHero>
    </F.FallbackMain>
  </F.FallbackShell>
);

// dashboard shell skeleton
const DashboardFallback = () => (
  <F.FallbackShell role="status" aria-busy="true" aria-label="Loading page">
    {/* faux sidebar — only visible ≥1440px, same as the real <Sidebar> */}
    <F.FallbackSidebar aria-hidden="true">
      <F.FallbackStack>
        <SkeletonLine $h="14px" $w="70%" $mb="0" />
        <SkeletonLine $h="10px" $w="45%" $mb="0" />
      </F.FallbackStack>
      <F.FallbackSidebarNav>
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonLine key={i} $h="20px" $w="100%" $mb="0" />
        ))}
      </F.FallbackSidebarNav>
    </F.FallbackSidebar>

    <F.FallbackMain>
      {/* sticky-style header — hamburger + title stack + controls */}
      <F.FallbackHeader aria-hidden="true">
        <F.FallbackHeaderTitle>
          <SkeletonLine $h="18px" $w="220px" $mb="0" />
          <SkeletonLine $h="12px" $w="160px" $mb="0" />
        </F.FallbackHeaderTitle>
        <F.FallbackHeaderControls>
          <SkeletonBlock $h="36px" $w="90px" $r="8px" />
          <SkeletonCircle $size="36px" />
        </F.FallbackHeaderControls>
      </F.FallbackHeader>

      <F.FallbackContent aria-hidden="true">
        {/* 4 KPI metric cards */}
        <F.FallbackCardGrid>
          {Array.from({ length: 4 }).map((_, i) => (
            <F.FallbackCard key={i}>
              <F.FallbackCardRow>
                <SkeletonLine $h="10px" $w="55%" $mb="0" />
                <SkeletonCircle $size="28px" />
              </F.FallbackCardRow>
              <SkeletonLine $h="28px" $w="45%" $mb="0" />
            </F.FallbackCard>
          ))}
        </F.FallbackCardGrid>

        {/* large content panel (chart / table placeholder) */}
        <F.FallbackPanel>
          <SkeletonLine $h="18px" $w="30%" $mb="0" />
          <SkeletonBlock $h="clamp(200px, 35vw, 280px)" $r="8px" />
        </F.FallbackPanel>
      </F.FallbackContent>
    </F.FallbackMain>
  </F.FallbackShell>
);

const RouteFallback = ({ variant = 'dashboard' }) => {
  if (variant === 'auth')      return <AuthFallback />;
  if (variant === 'marketing') return <MarketingFallback />;
  return <DashboardFallback />;
};

export default RouteFallback;
