import 'styled-components';

interface ThemeColors {
  bg: string;
  surface: string;
  surfaceHover: string;
  primary: string;
  primaryLight: string;
  secondary: string;
  secondaryLight: string;
  text: string;
  textSecondary: string;
  border: string;
  borderFocus: string;
  success: string;
  warning: string;
  shadow: string;
  shadowMd: string;
  overlay: string;
}

interface ThemeRadii {
  sm: string;
  md: string;
  lg: string;
  full: string;
}

interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}

interface ThemeBreakpoints {
  mobile: string;
  tablet: string;
  desktop: string;
  wide: string;
  ultraWide: string;
}

interface ThemeTransitions {
  fast: string;
  normal: string;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: ThemeColors;
    radii: ThemeRadii;
    spacing: ThemeSpacing;
    breakpoints: ThemeBreakpoints;
    transitions: ThemeTransitions;
  }
}

