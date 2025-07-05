import { useState, useEffect, useCallback } from 'react';
import { useTheme } from 'next-themes';
import {
  ThemeConfig,
  getAvailableThemes,
  getThemeByName,
  getThemeMetadata,
  getAvailableThemeNames,
  cleanupInvalidThemePreference,
} from '../themes';
import {
  applyTheme,
  applyThemeWithTransition,
  saveThemePreference,
  loadThemePreference,
  applyInstantThemeFromCache,
  saveThemeWithCache,
} from '../lib/theme-utils';
import ReactGA from 'react-ga4';

export interface UseThemeManagerReturn {
  // Current theme configuration
  currentTheme: ThemeConfig | null;

  // Available themes (lazy loaded)
  themes: ThemeConfig[];

  // Theme metadata (always available)
  themeMetadata: Array<{ name: string; displayName: string }>;

  // Current mode (light/dark)
  mode: 'light' | 'dark';

  // Theme management functions
  setTheme: (themeName: string) => Promise<void>;
  toggleMode: () => void;
  applyThemeConfig: (theme: ThemeConfig, mode?: 'light' | 'dark') => void;

  // Loading state
  isLoading: boolean;

  // Theme utilities
  resetToDefault: () => Promise<void>;
  previewTheme: (theme: ThemeConfig, mode?: 'light' | 'dark') => void;
  cancelPreview: () => void;

  // Lazy loading utilities
  loadAllThemes: () => Promise<void>;
}

export const useThemeManager = (): UseThemeManagerReturn => {
  const { theme: nextTheme, setTheme: setNextTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig | null>(null);
  const [availableThemes, setAvailableThemes] = useState<ThemeConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [themeListLoaded, setThemeListLoaded] = useState(false);
  const [previewState, setPreviewState] = useState<{
    isPreviewActive: boolean;
    originalTheme: ThemeConfig | null;
    originalMode: 'light' | 'dark';
  }>({
    isPreviewActive: false,
    originalTheme: null,
    originalMode: 'light',
  });

  // Get current mode from next-themes
  const mode = (nextTheme as 'light' | 'dark') || 'light';

  // Initialize theme on mount (only once)
  useEffect(() => {
    if (isInitialized) return;

    const initializeTheme = async () => {
      setIsLoading(true);

      try {
        // Clean up any invalid theme preferences first
        cleanupInvalidThemePreference();

        // Apply cached theme INSTANTLY to eliminate loading flash
        const hasInstantTheme = applyInstantThemeFromCache();

        // Check for saved preference FIRST before loading any theme
        const savedPreference = loadThemePreference();
        let themeToLoad = 'default';
        let modeToUse = mode;

        if (savedPreference) {
          themeToLoad = savedPreference.themeName;
          modeToUse = savedPreference.mode;
        }

        // Load the target theme (either saved or default)
        let targetTheme = await getThemeByName(themeToLoad);

        if (!targetTheme) {
          // If saved theme doesn't exist, fall back to default
          targetTheme = await getThemeByName('default');

          if (!targetTheme) {
            // If default doesn't exist, try to get any available theme
            const themeNames = getAvailableThemeNames();
            if (themeNames.length > 0) {
              targetTheme = await getThemeByName(themeNames[0]);
            }
          }
        }

        if (!targetTheme) {
          throw new Error('No themes available');
        }

        // Apply the theme only once we know which one to use
        setCurrentTheme(targetTheme);

        // Set the mode before applying the theme to avoid mode mismatch
        if (savedPreference && savedPreference.mode !== mode) {
          setNextTheme(savedPreference.mode);
        }

        // Apply the theme with the correct mode (only if we didn't apply instant theme, or if theme differs)
        if (
          !hasInstantTheme ||
          savedPreference?.themeName !== targetTheme.name
        ) {
          applyTheme(targetTheme, modeToUse);
        }

        // Cache the theme for next time
        saveThemeWithCache(targetTheme, modeToUse);
      } catch (error) {
        console.error('Error initializing theme:', error);
        // Create a minimal fallback theme
        const fallbackTheme: ThemeConfig = {
          name: 'fallback',
          displayName: 'Fallback',
          colors: {
            light: {
              background: '#ffffff',
              foreground: '#000000',
              card: '#ffffff',
              cardForeground: '#000000',
              popover: '#ffffff',
              popoverForeground: '#000000',
              primary: '#000000',
              primaryForeground: '#ffffff',
              secondary: '#f5f5f5',
              secondaryForeground: '#000000',
              muted: '#f5f5f5',
              mutedForeground: '#666666',
              accent: '#f5f5f5',
              accentForeground: '#000000',
              destructive: '#ff0000',
              destructiveForeground: '#ffffff',
              border: '#e5e5e5',
              input: '#e5e5e5',
              ring: '#000000',
              chart1: '#000000',
              chart2: '#666666',
              chart3: '#999999',
              chart4: '#cccccc',
              chart5: '#e5e5e5',
              sidebar: '#f5f5f5',
              sidebarForeground: '#000000',
              sidebarPrimary: '#000000',
              sidebarPrimaryForeground: '#ffffff',
              sidebarAccent: '#f5f5f5',
              sidebarAccentForeground: '#000000',
              sidebarBorder: '#e5e5e5',
              sidebarRing: '#000000',
            },
            dark: {
              background: '#000000',
              foreground: '#ffffff',
              card: '#1a1a1a',
              cardForeground: '#ffffff',
              popover: '#1a1a1a',
              popoverForeground: '#ffffff',
              primary: '#ffffff',
              primaryForeground: '#000000',
              secondary: '#333333',
              secondaryForeground: '#ffffff',
              muted: '#333333',
              mutedForeground: '#999999',
              accent: '#333333',
              accentForeground: '#ffffff',
              destructive: '#ff0000',
              destructiveForeground: '#ffffff',
              border: '#333333',
              input: '#333333',
              ring: '#ffffff',
              chart1: '#ffffff',
              chart2: '#cccccc',
              chart3: '#999999',
              chart4: '#666666',
              chart5: '#333333',
              sidebar: '#1a1a1a',
              sidebarForeground: '#ffffff',
              sidebarPrimary: '#ffffff',
              sidebarPrimaryForeground: '#000000',
              sidebarAccent: '#333333',
              sidebarAccentForeground: '#ffffff',
              sidebarBorder: '#333333',
              sidebarRing: '#ffffff',
            },
          },
          fonts: {
            sans: 'system-ui, sans-serif',
            serif: 'Georgia, serif',
            mono: 'monospace',
          },
          radius: '4px',
          shadows: {
            shadow2xs: '0 1px 2px rgba(0,0,0,0.1)',
            shadowXs: '0 1px 2px rgba(0,0,0,0.1)',
            shadowSm: '0 2px 4px rgba(0,0,0,0.1)',
            shadow: '0 4px 8px rgba(0,0,0,0.1)',
            shadowMd: '0 8px 16px rgba(0,0,0,0.1)',
            shadowLg: '0 16px 32px rgba(0,0,0,0.1)',
            shadowXl: '0 32px 64px rgba(0,0,0,0.1)',
            shadow2xl: '0 32px 64px rgba(0,0,0,0.2)',
          },
          trackingNormal: '0em',
          spacing: '0.25rem',
        };
        setCurrentTheme(fallbackTheme);
        setAvailableThemes([fallbackTheme]);
        applyTheme(fallbackTheme, mode);
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    };

    // Only initialize when next-themes is ready
    if (nextTheme !== undefined) {
      initializeTheme();
    }
  }, [nextTheme, isInitialized, mode, setNextTheme]);

  // Apply theme when mode changes (but not during initialization)
  useEffect(() => {
    if (
      !isLoading &&
      isInitialized &&
      !previewState.isPreviewActive &&
      currentTheme
    ) {
      // When mode changes, ensure we're applying the correct saved theme
      const savedPreference = loadThemePreference();
      if (savedPreference && savedPreference.themeName !== currentTheme.name) {
        // Theme mismatch - reload the correct theme
        getThemeByName(savedPreference.themeName).then(correctTheme => {
          if (correctTheme) {
            setCurrentTheme(correctTheme);
            applyThemeWithTransition(correctTheme, mode, 200);
            return;
          }
          // Apply current theme with new mode if no correct theme found
          applyThemeWithTransition(currentTheme, mode, 200);
        });
      } else {
        // Apply current theme with new mode
        applyThemeWithTransition(currentTheme, mode, 200);
      }
    }
  }, [
    mode,
    currentTheme,
    isLoading,
    isInitialized,
    previewState.isPreviewActive,
  ]);

  // Set theme by name
  const setTheme = useCallback(
    async (themeName: string) => {
      const theme = await getThemeByName(themeName);
      if (theme) {
        // Track successful theme change
        ReactGA.event({
          category: 'Theme',
          action: 'Theme Applied',
          label: themeName,
          value: 1,
        });

        setCurrentTheme(theme);
        applyThemeWithTransition(theme, mode);
        saveThemeWithCache(theme, mode);
      } else {
        // Track theme fallback
        ReactGA.event({
          category: 'Theme',
          action: 'Theme Fallback',
          label: `${themeName} -> default`,
          value: 1,
        });

        // Fallback to default theme if requested theme doesn't exist
        console.warn(`Theme '${themeName}' not found, falling back to default`);
        const defaultTheme = await getThemeByName('default');
        if (defaultTheme) {
          setCurrentTheme(defaultTheme);
          applyThemeWithTransition(defaultTheme, mode);
          saveThemeWithCache(defaultTheme, mode);
        }
      }
    },
    [mode]
  );

  // Toggle between light and dark mode
  const toggleMode = useCallback(() => {
    if (!currentTheme) return;
    const newMode = mode === 'light' ? 'dark' : 'light';

    // Track mode toggle
    ReactGA.event({
      category: 'Theme',
      action: 'Mode Toggle',
      label: `${mode} to ${newMode}`,
      value: 1,
    });

    setNextTheme(newMode);
    // Save the current theme with the new mode
    saveThemeWithCache(currentTheme, newMode);
  }, [mode, currentTheme, setNextTheme]);

  // Apply a theme configuration directly
  const applyThemeConfig = useCallback(
    (theme: ThemeConfig, themeMode?: 'light' | 'dark') => {
      const targetMode = themeMode || mode;
      setCurrentTheme(theme);
      applyThemeWithTransition(theme, targetMode);
      saveThemeWithCache(theme, targetMode);

      if (themeMode && themeMode !== mode) {
        setNextTheme(themeMode);
      }
    },
    [mode, setNextTheme]
  );

  // Reset to default theme
  const resetToDefault = useCallback(async () => {
    const defaultTheme =
      availableThemes.find(t => t.name === 'default') || availableThemes[0];
    if (defaultTheme) {
      // Track theme reset
      ReactGA.event({
        category: 'Theme',
        action: 'Reset to Default',
        label: currentTheme?.name || 'unknown',
        value: 1,
      });

      setCurrentTheme(defaultTheme);
      applyThemeWithTransition(defaultTheme, mode);
      saveThemeWithCache(defaultTheme, mode);
    }
  }, [mode, availableThemes, currentTheme]);

  // Preview a theme temporarily
  const previewTheme = useCallback(
    (theme: ThemeConfig, themeMode?: 'light' | 'dark') => {
      if (!currentTheme) return;

      const targetMode = themeMode || mode;

      // Track theme preview
      ReactGA.event({
        category: 'Theme',
        action: 'Theme Preview',
        label: `${theme.name} (${targetMode})`,
        value: 1,
      });

      // Save current state if not already previewing
      if (!previewState.isPreviewActive) {
        setPreviewState({
          isPreviewActive: true,
          originalTheme: currentTheme,
          originalMode: mode,
        });
      }

      // Apply preview theme
      applyThemeWithTransition(theme, targetMode, 200);

      // Set temporary mode if different
      if (themeMode && themeMode !== mode) {
        setNextTheme(themeMode);
      }
    },
    [mode, currentTheme, previewState.isPreviewActive, setNextTheme]
  );

  // Cancel preview and restore original theme
  const cancelPreview = useCallback(() => {
    if (previewState.isPreviewActive && previewState.originalTheme) {
      // Track preview cancellation
      ReactGA.event({
        category: 'Theme',
        action: 'Cancel Preview',
        label: `${previewState.originalTheme.name} (${previewState.originalMode})`,
        value: 1,
      });

      // Restore original theme and mode
      applyThemeWithTransition(
        previewState.originalTheme,
        previewState.originalMode,
        200
      );
      setCurrentTheme(previewState.originalTheme);
      setNextTheme(previewState.originalMode);

      // Clear preview state
      setPreviewState({
        isPreviewActive: false,
        originalTheme: null,
        originalMode: 'light',
      });
    }
  }, [previewState, setNextTheme]);

  // Function to load all themes (for components that need them)
  const loadAllThemesFunction = useCallback(async () => {
    if (!themeListLoaded) {
      const themes = await getAvailableThemes();
      setAvailableThemes(themes);
      setThemeListLoaded(true);
    }
  }, [themeListLoaded]);

  // Load theme list after initialization for dropdowns/selectors
  useEffect(() => {
    if (isInitialized && !themeListLoaded) {
      loadAllThemesFunction();
    }
  }, [isInitialized, themeListLoaded, loadAllThemesFunction]);

  return {
    currentTheme,
    themes: availableThemes,
    themeMetadata: getThemeMetadata(),
    mode,
    setTheme,
    toggleMode,
    applyThemeConfig,
    isLoading,
    resetToDefault,
    previewTheme,
    cancelPreview,
    loadAllThemes: loadAllThemesFunction,
  };
};
