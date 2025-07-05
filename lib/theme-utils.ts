import { ThemeConfig, ThemeColors } from '../themes';

// Convert camelCase to kebab-case for CSS custom properties
const camelToKebab = (str: string): string => {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
};

// Apply color variables to CSS custom properties
const applyColorVariables = (
  colors: ThemeColors,
  isDark: boolean = false
): void => {
  const root = document.documentElement;

  Object.entries(colors).forEach(([key, value]) => {
    const cssVar = `--${camelToKebab(key)}`;
    // Use !important to ensure our dynamic values override static CSS
    root.style.setProperty(cssVar, value, 'important');
  });
};

// Apply font variables to CSS custom properties
const applyFontVariables = (fonts: ThemeConfig['fonts']): void => {
  const root = document.documentElement;

  Object.entries(fonts).forEach(([key, value]) => {
    const cssVar = `--font-${key}`;
    root.style.setProperty(cssVar, value, 'important');
  });
};

// Apply shadow variables to CSS custom properties
const applyShadowVariables = (shadows: ThemeConfig['shadows']): void => {
  const root = document.documentElement;

  Object.entries(shadows).forEach(([key, value]) => {
    const cssVar = `--${camelToKebab(key)}`;
    root.style.setProperty(cssVar, value, 'important');
  });
};

// Apply other theme variables
const applyOtherVariables = (theme: ThemeConfig): void => {
  const root = document.documentElement;

  root.style.setProperty('--radius', theme.radius, 'important');
  root.style.setProperty(
    '--tracking-normal',
    theme.trackingNormal,
    'important'
  );
  root.style.setProperty('--spacing', theme.spacing, 'important');
};

// Main function to apply a complete theme
export const applyTheme = (
  theme: ThemeConfig,
  mode: 'light' | 'dark' = 'light'
): void => {
  const colors = mode === 'dark' ? theme.colors.dark : theme.colors.light;

  // Apply all theme variables - these will override the minimal CSS fallbacks
  applyColorVariables(colors);
  applyFontVariables(theme.fonts);
  applyShadowVariables(theme.shadows);
  applyOtherVariables(theme);
};

// Function to get current theme from CSS custom properties
export const getCurrentThemeFromCSS = (): Partial<ThemeConfig> => {
  const root = document.documentElement;
  const computedStyle = getComputedStyle(root);

  // This is a helper function to extract current theme values
  // Mainly useful for debugging or creating theme presets
  const getVar = (name: string) =>
    computedStyle.getPropertyValue(`--${name}`).trim();

  return {
    colors: {
      light: {
        background: getVar('background'),
        foreground: getVar('foreground'),
        card: getVar('card'),
        cardForeground: getVar('card-foreground'),
        popover: getVar('popover'),
        popoverForeground: getVar('popover-foreground'),
        primary: getVar('primary'),
        primaryForeground: getVar('primary-foreground'),
        secondary: getVar('secondary'),
        secondaryForeground: getVar('secondary-foreground'),
        muted: getVar('muted'),
        mutedForeground: getVar('muted-foreground'),
        accent: getVar('accent'),
        accentForeground: getVar('accent-foreground'),
        destructive: getVar('destructive'),
        destructiveForeground: getVar('destructive-foreground'),
        border: getVar('border'),
        input: getVar('input'),
        ring: getVar('ring'),
        chart1: getVar('chart-1'),
        chart2: getVar('chart-2'),
        chart3: getVar('chart-3'),
        chart4: getVar('chart-4'),
        chart5: getVar('chart-5'),
        sidebar: getVar('sidebar'),
        sidebarForeground: getVar('sidebar-foreground'),
        sidebarPrimary: getVar('sidebar-primary'),
        sidebarPrimaryForeground: getVar('sidebar-primary-foreground'),
        sidebarAccent: getVar('sidebar-accent'),
        sidebarAccentForeground: getVar('sidebar-accent-foreground'),
        sidebarBorder: getVar('sidebar-border'),
        sidebarRing: getVar('sidebar-ring'),
      },
      dark: {
        background: getVar('background'),
        foreground: getVar('foreground'),
        card: getVar('card'),
        cardForeground: getVar('card-foreground'),
        popover: getVar('popover'),
        popoverForeground: getVar('popover-foreground'),
        primary: getVar('primary'),
        primaryForeground: getVar('primary-foreground'),
        secondary: getVar('secondary'),
        secondaryForeground: getVar('secondary-foreground'),
        muted: getVar('muted'),
        mutedForeground: getVar('muted-foreground'),
        accent: getVar('accent'),
        accentForeground: getVar('accent-foreground'),
        destructive: getVar('destructive'),
        destructiveForeground: getVar('destructive-foreground'),
        border: getVar('border'),
        input: getVar('input'),
        ring: getVar('ring'),
        chart1: getVar('chart-1'),
        chart2: getVar('chart-2'),
        chart3: getVar('chart-3'),
        chart4: getVar('chart-4'),
        chart5: getVar('chart-5'),
        sidebar: getVar('sidebar'),
        sidebarForeground: getVar('sidebar-foreground'),
        sidebarPrimary: getVar('sidebar-primary'),
        sidebarPrimaryForeground: getVar('sidebar-primary-foreground'),
        sidebarAccent: getVar('sidebar-accent'),
        sidebarAccentForeground: getVar('sidebar-accent-foreground'),
        sidebarBorder: getVar('sidebar-border'),
        sidebarRing: getVar('sidebar-ring'),
      },
    },
    fonts: {
      sans: getVar('font-sans'),
      serif: getVar('font-serif'),
      mono: getVar('font-mono'),
    },
    radius: getVar('radius'),
  };
};

// Function to smoothly transition between themes
export const applyThemeWithTransition = (
  theme: ThemeConfig,
  mode: 'light' | 'dark' = 'light',
  duration: number = 300
): void => {
  const root = document.documentElement;

  // Add transition to root element
  root.style.transition = `all ${duration}ms ease-in-out`;

  // Apply the theme
  applyTheme(theme, mode);

  // Remove transition after animation completes
  setTimeout(() => {
    root.style.transition = '';
  }, duration);
};

// Utility to save theme preference to localStorage
export const saveThemePreference = (
  themeName: string,
  mode: 'light' | 'dark'
): void => {
  localStorage.setItem('theme-preference', JSON.stringify({ themeName, mode }));
};

// Utility to load theme preference from localStorage
export const loadThemePreference = (): {
  themeName: string;
  mode: 'light' | 'dark';
} | null => {
  try {
    const saved = localStorage.getItem('theme-preference');
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

// Utility to instantly apply saved theme from localStorage CSS variables
// This provides immediate theme application without waiting for theme loading
export const applyInstantThemeFromCache = (): boolean => {
  try {
    const cachedTheme = localStorage.getItem('theme-cache');
    const cachedMode = localStorage.getItem('theme-mode-cache');

    if (cachedTheme && cachedMode) {
      const themeData = JSON.parse(cachedTheme);
      const mode = JSON.parse(cachedMode) as 'light' | 'dark';

      // Apply cached theme colors instantly
      const root = document.documentElement;
      const colors = themeData.colors[mode];

      Object.entries(colors).forEach(([key, value]) => {
        const cssVar = `--${camelToKebab(key)}`;
        root.style.setProperty(cssVar, value as string, 'important');
      });

      return true;
    }
  } catch (error) {
    console.warn('Failed to apply instant theme from cache:', error);
  }

  return false;
};

// Enhanced save function that also caches theme data for instant application
export const saveThemeWithCache = (
  theme: ThemeConfig,
  mode: 'light' | 'dark'
): void => {
  // Save preference
  saveThemePreference(theme.name, mode);

  // Cache theme data for instant application
  try {
    localStorage.setItem('theme-cache', JSON.stringify(theme));
    localStorage.setItem('theme-mode-cache', JSON.stringify(mode));
  } catch (error) {
    console.warn('Failed to cache theme data:', error);
  }
};
