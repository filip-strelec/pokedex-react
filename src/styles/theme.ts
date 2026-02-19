import type { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    bg: '#f0f4f8',
    surface: '#ffffff',
    surfaceHover: '#f7fafc',
    primary: '#e53e3e',
    primaryLight: '#feb2b2',
    secondary: '#3182ce',
    secondaryLight: '#bee3f8',
    text: '#1a202c',
    textSecondary: '#718096',
    border: '#e2e8f0',
    borderFocus: '#3182ce',
    success: '#38a169',
    warning: '#ecc94b',
    shadow: 'rgba(0, 0, 0, 0.08)',
    shadowMd: 'rgba(0, 0, 0, 0.12)',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
  radii: {
    sm: '6px',
    md: '10px',
    lg: '16px',
    full: '9999px',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px',
    ultraWide: '1536px',
  },
  transitions: {
    fast: '0.15s ease',
    normal: '0.25s ease',
  },
};

