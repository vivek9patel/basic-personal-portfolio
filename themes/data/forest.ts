import { ThemeConfig } from '../types';

export const forestTheme: ThemeConfig = {
  name: 'forest',
  displayName: 'Forest',
  colors: {
    light: {
      background: '#f8fdf8',
      foreground: '#1a3a1a',
      card: '#ffffff',
      cardForeground: '#1a3a1a',
      popover: '#ffffff',
      popoverForeground: '#1a3a1a',
      primary: '#22c55e',
      primaryForeground: '#ffffff',
      secondary: '#f0fdf4',
      secondaryForeground: '#1a3a1a',
      muted: '#f1f5f1',
      mutedForeground: '#4a5d4a',
      accent: '#16a34a',
      accentForeground: '#ffffff',
      destructive: '#dc2626',
      destructiveForeground: '#ffffff',
      border: '#d1d5db',
      input: '#d1d5db',
      ring: '#22c55e',
      chart1: '#22c55e',
      chart2: '#16a34a',
      chart3: '#15803d',
      chart4: '#166534',
      chart5: '#14532d',
      sidebar: '#f1f5f1',
      sidebarForeground: '#1a3a1a',
      sidebarPrimary: '#22c55e',
      sidebarPrimaryForeground: '#ffffff',
      sidebarAccent: '#16a34a',
      sidebarAccentForeground: '#ffffff',
      sidebarBorder: '#d1d5db',
      sidebarRing: '#22c55e',
    },
    dark: {
      background: '#0a1a0a',
      foreground: '#e8f5e8',
      card: '#1a2e1a',
      cardForeground: '#e8f5e8',
      popover: '#1a2e1a',
      popoverForeground: '#e8f5e8',
      primary: '#4ade80',
      primaryForeground: '#0a1a0a',
      secondary: '#1a2e1a',
      secondaryForeground: '#e8f5e8',
      muted: '#2d4a2d',
      mutedForeground: '#94a3b8',
      accent: '#22c55e',
      accentForeground: '#ffffff',
      destructive: '#ef4444',
      destructiveForeground: '#ffffff',
      border: '#4a5d4a',
      input: '#4a5d4a',
      ring: '#4ade80',
      chart1: '#4ade80',
      chart2: '#22c55e',
      chart3: '#16a34a',
      chart4: '#15803d',
      chart5: '#166534',
      sidebar: '#1a2e1a',
      sidebarForeground: '#e8f5e8',
      sidebarPrimary: '#4ade80',
      sidebarPrimaryForeground: '#0a1a0a',
      sidebarAccent: '#22c55e',
      sidebarAccentForeground: '#ffffff',
      sidebarBorder: '#4a5d4a',
      sidebarRing: '#4ade80',
    },
  },
  fonts: {
    sans: 'Inter, sans-serif',
    serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
    mono: 'JetBrains Mono, monospace',
  },
  radius: '6px',
  shadows: {
    shadow2xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    shadowXs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    shadowSm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    shadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    shadowMd:
      '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    shadowLg:
      '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    shadowXl: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    shadow2xl: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  },
  trackingNormal: '0em',
  spacing: '0.25rem',
};
