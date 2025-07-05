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
} from './loader';

// For backwards compatibility, export a synchronous function that returns a promise
export async function availableThemes() {
  const { getAvailableThemes } = await import('./loader');
  return getAvailableThemes();
}
