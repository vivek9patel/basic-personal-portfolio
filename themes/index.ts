// Re-export types for easier importing
export type { ThemeColors, ThemeConfig } from './types';

// Re-export the dynamic loader functions
export {
  loadAllThemes,
  getAvailableThemes,
  getThemeByName,
  clearThemeCache,
  getThemeMetadata,
  getAvailableThemeNames,
  cleanupInvalidThemePreference,
  DEFAULT_THEME_NAME,
  FALLBACK_THEME_NAME,
} from './loader';

// For backwards compatibility, export a synchronous function that returns a promise
export async function availableThemes() {
  const { getAvailableThemes } = await import('./loader');
  return getAvailableThemes();
}
