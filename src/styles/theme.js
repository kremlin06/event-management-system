export const lightTheme = {
   colors: {
      // Backgrounds — soft gray page so white cards/panels visibly lift off it.
      // old: bgPrimary was pure #ffffff, which made white cards blend into the page.
      bgPrimary: '#eceef2',    // page canvas — soft light gray (old: #ffffff)
      bgSecondary: '#f6f7f9',    // sidebars, table headers — near-white raised surface (old: #f8f9fa)
      bgTertiary: '#e3e6ec',    // inputs, tags, table rows — visibly grayer (old: #e9ecef)
      bgHover: '#d7dbe2',    // hover state — clearly darker (old: #dee2e6)
      bgActive: '#c6ccd5',    // active / pressed state (old: #ced4da)

      // Text — high-contrast so nothing looks washed out
      textPrimary: '#212529',  // headings, body copy — near black
      textSecondary: '#495057',  // supporting text
      textTertiary: '#6c757d',  // placeholders, captions
      textDisabled: '#adb5bd',  // disabled controls
      textLink: '#007bff',  // hyperlinks
      textOnAccent: '#ffffff',  // text sitting on a solid accent/blue fill — always white for contrast

      // Accents
      accentPrimary: '#007bff',
      accentSecondary: '#6c757d',
      accentHover: '#0056b3',

      accentOrange: '#e67700',
      accentOrangeHover:'#c96300',
      accentWarm: '#fd7e14',

      // Semantic / status
      success: '#28a745',
      successBg: '#d4edda',
      warning: '#ffc107',
      warningBg: '#fff3cd',
      error: '#dc3545',
      errorBg: '#f8d7da',
      info: '#17a2b8',
      infoBg: '#d1ecf1',

      // Borders — darker so card / section edges are clearly visible on light bg
      borderColor: '#d3d8e0',    // (old: #dee2e6)
      borderDark: '#a7afba',    // (old: #adb5bd)
      borderLight: '#e6e9ee',    // (old: #f8f9fa)

      // Shadows — layered + slate-tinted for real depth on light surfaces.
      // old: single-layer low-alpha black shadows that barely registered on white.
      shadowSm: '0 1px 2px rgba(16, 24, 40, 0.08), 0 1px 3px rgba(16, 24, 40, 0.10)',
      shadowMd: '0 2px 6px rgba(16, 24, 40, 0.10), 0 6px 16px rgba(16, 24, 40, 0.13)',
      shadowLg: '0 8px 18px rgba(16, 24, 40, 0.12), 0 14px 32px rgba(16, 24, 40, 0.16)',
      shadowXl: '0 14px 28px rgba(16, 24, 40, 0.16), 0 28px 56px rgba(16, 24, 40, 0.22)',

      // Cards — white so they pop against the gray page background
      cardBg: '#ffffff',
      cardHover: '#f6f7f9',

      // Glassmorphism — frosted info cards (Learn More section). translucent white
      // over the section's accent glow gives the apple-style frosted look.
      glassBg: 'rgba(255, 255, 255, 0.62)',
      glassBorder: 'rgba(255, 255, 255, 0.85)',
      glassGlow: 'rgba(0, 123, 255, 0.18)',   // soft accent halo behind the glass

      // Inputs
      inputBg: '#ffffff',
      inputBorder: '#c9cfd8',    // (old: #ced4da) more visible field outline
      inputFocus: '#007bff',

      // Badges
      badgeBg: '#e9ecef',
      badgeText: '#495057',

      // Stars
      starColor: '#ffc107',
      starEmpty: '#d3d8e0',     // (old: #dee2e6) matches borderColor for consistency

      // Navigation
      navBg: '#ffffff',
      navBlurBg: 'rgba(246, 247, 249, 0.85)',  // translucent layer for the sticky nav so backdrop-filter blur is visible
      navBorder: '#d3d8e0',     // (old: #dee2e6) more visible nav divider
      navActive: '#007bff',
   },

   gradients: {
      // added: these three were missing from lightTheme entirely, which made the
      // hero <h1> (clipped textGradient) and the dashboard mockup panel
      // (mockupGradient) render invisible / transparent in light mode.
      // - textGradient: dark ink → blue so the clipped heading is readable on a light page
      // - mockupGradient: deep blue panel so the white-glass mockup children have contrast
      // - blueGradient: vibrant accent for any decorative blue fills
      blueGradient: 'linear-gradient(135deg, #4f8cff 0%, #2563eb 100%)',
      textGradient: 'linear-gradient(135deg, #1c2536 0%, #2563eb 140%)',
      mockupGradient: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #3b82f6 100%)',

      heroGradient: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      cardGradient: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
      accentGradient: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
      orangeGradient: 'linear-gradient(135deg, #fd7e14 0%, #e67700 100%)',
      warmGradient: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
      subtleGradient: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)',
   },
};

export const darkTheme = {
   colors: {
      bgPrimary: '#0a0a0a',
      bgSecondary: '#111111',
      bgTertiary: '#1a1a1a',
      bgHover: '#222222',
      bgActive: '#2a2a2a',
      
      textPrimary: '#ffffff',
      textSecondary: '#a1a1aa',
      textTertiary: '#71717a',
      textDisabled: '#52525b',
      textLink: '#60a5fa',
      textOnAccent: '#ffffff',  // text on a solid accent/blue fill — always white for contrast
      
      accentPrimary: '#3b82f6',
      accentSecondary: '#2563eb',
      accentHover: '#60a5fa',
      
      accentOrange: '#f59e0b',
      accentOrangeHover: '#d97706',
      accentWarm: '#fb923c',
      
      success: '#22c55e',
      successBg: '#052e16',
      warning: '#eab308',
      warningBg: '#422006',
      error: '#ef4444',
      errorBg: '#450a0a',
      info: '#3b82f6',
      infoBg: '#172554',
      
      borderColor: '#27272a',
      borderDark: '#3f3f46',
      borderLight: '#18181b',
      
      shadowSm: '0 1px 3px rgba(0, 0, 0, 0.3)',
      shadowMd: '0 4px 12px rgba(0, 0, 0, 0.4)',
      shadowLg: '0 8px 24px rgba(0, 0, 0, 0.5)',
      shadowXl: '0 12px 40px rgba(0, 0, 0, 0.6)',
      
      cardBg: '#111111',
      cardHover: '#1a1a1a',

      // Glassmorphism — frosted info cards (Learn More section)
      glassBg: 'rgba(255, 255, 255, 0.05)',
      glassBorder: 'rgba(255, 255, 255, 0.12)',
      glassGlow: 'rgba(59, 130, 246, 0.20)',  // soft accent halo behind the glass
      
      inputBg: '#1a1a1a',
      inputBorder: '#27272a',
      inputFocus: '#3b82f6',
      
      badgeBg: '#1a1a1a',
      badgeText: '#ffffff',
      
      starColor: '#f59e0b',
      starEmpty: '#27272a',
      
      navBg: '#0a0a0a',
      navBlurBg: 'rgba(17, 17, 17, 0.85)',  // translucent layer for the sticky nav so backdrop-filter blur is visible
      navBorder: '#27272a',
      navActive: '#ffffff',
   },
   
   gradients: {
      blueGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      textGradient: 'linear-gradient(135deg, #fff 0%, #a1a1aa 100%)',
      mockupGradient: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)',
      heroGradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      cardGradient: 'linear-gradient(145deg, #111111 0%, #1a1a1a 100%)',
      accentGradient: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
      orangeGradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      warmGradient: 'linear-gradient(135deg, #1a1208 0%, #2d1f0e 100%)',
      subtleGradient: 'linear-gradient(180deg, #0a0a0a 0%, #111111 100%)',
   },
};

// Shared theme properties
export const sharedTheme = {
   spacing: {
      xs: '0.5rem',
      sm: '0.625rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      xxl: '4rem',
   },
   transitions: {
      default: 'all 0.3s ease',
      fast: 'all 0.15s ease',
      slow: 'all 0.5s ease',
   },
   fonts: {
      primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'SF Pro Display', Roboto, sans-serif",
      secondary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      mono: "'SF Mono', 'Fira Code', 'Fira Mono', monospace",
   },
   fontSizes: {
      h1: '3.5rem',
      h2: '2.5rem',
      h3: '1.75rem',
      h4: '1.25rem',
      h5: '1.125rem',
      h6: '1rem',
      body: '1rem',
      bodyMd: '0.95rem',
      bodySm: '0.875rem',
      bodyXs: '0.75rem',
   },
   fontWeights: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
   },
   lineHeights: {
      tight: 1.1,
      normal: 1.6,
      relaxed: 1.7,
   },
   borderRadius: {
      sm: '6px',
      md: '8px',
      lg: '12px',
      xl: '16px',
      full: '9999px',
   },
   breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xxl: '1536px',
   },
};

// Create theme by merging colors + shared properties
export const createTheme = (mode = 'dark') => {
   const colors = mode === 'light' ? lightTheme.colors : darkTheme.colors;
   const gradients = mode === 'light' ? lightTheme.gradients : darkTheme.gradients;
   
   return {
      colors,
      gradients,
      ...sharedTheme,
      mode,
   };
};

export default createTheme('dark');


// export const theme = {
//    colors: {
//       bgPrimary: '#0a0a0a',
//       bgSecondary: '#111111',
//       bgTertiary: '#1a1a1a',
//       textPrimary: '#ffffff',
//       textSecondary: '#a1a1aa',
//       textTertiary: '#71717a',
//       accentPrimary: '#3b82f6',
//       accentSecondary: '#2563eb',
//       borderColor: '#27272a',
//       success: '#22c55e',
//    },
//    gradients: {
//       blueGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//       textGradient: 'linear-gradient(135deg, #fff 0%, #a1a1aa 100%)',
//       mockupGradient: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)',
//    },
//    spacing: {
//       xs: '0.5rem',
//       sm: '0.625rem',
//       md: '1rem',
//       lg: '1.5rem',
//       xl: '2rem',
//       xxl: '4rem',
//    },
//    transitions: {
//       default: 'all 0.3s ease',
//    },
//    fonts: {
//       primary: "'Segoe UI', 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
//       secondary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
//    },
//    fontSizes: {
//       h1: '3.5rem',
//       h2: '2.5rem',
//       h3: '1.75rem',
//       h4: '1.25rem',
//       h5: '1.125rem',
//       h6: '1rem',
//       body: '1rem',
//       bodyMd: '0.95rem',
//       bodySm: '0.875rem',
//       bodyXs: '0.75rem',
//    },
//    fontWeights: {
//       light: 300,
//       regular: 400,
//       medium: 500,
//       semibold: 600,
//       bold: 700,
//    },
//    lineHeights: {
//       tight: 1.1,
//       normal: 1.6,
//       relaxed: 1.7,
//    },
// };

// export default theme;