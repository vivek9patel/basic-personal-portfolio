export interface ThemeColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
  chart1: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;
  sidebar: string;
  sidebarForeground: string;
  sidebarPrimary: string;
  sidebarPrimaryForeground: string;
  sidebarAccent: string;
  sidebarAccentForeground: string;
  sidebarBorder: string;
  sidebarRing: string;
}

export interface ThemeConfig {
  name: string;
  displayName: string;
  colors: {
    light: ThemeColors;
    dark: ThemeColors;
  };
  fonts: {
    sans: string;
    serif: string;
    mono: string;
  };
  radius: string;
  shadows: {
    shadow2xs: string;
    shadowXs: string;
    shadowSm: string;
    shadow: string;
    shadowMd: string;
    shadowLg: string;
    shadowXl: string;
    shadow2xl: string;
  };
  trackingNormal: string;
  spacing: string;
}
