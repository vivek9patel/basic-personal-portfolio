import { ThemeConfig } from './types';

// Registry of available themes with lazy loading
const THEME_REGISTRY = {
  default: () => import('./data/default').then(m => m.defaultTheme),
  ocean: () => import('./data/ocean').then(m => m.oceanTheme),
  forest: () => import('./data/forest').then(m => m.forestTheme),
  earth: () => import('./data/earth').then(m => m.earthTheme),
  fire: () => import('./data/fire').then(m => m.fireTheme),
  air: () => import('./data/air').then(m => m.airTheme),
} as const;

// Get list of available theme names without loading the themes
export function getAvailableThemeNames(): string[] {
  return Object.keys(THEME_REGISTRY);
}

// Load a specific theme by name (lazy loaded)
export async function loadTheme(name: string): Promise<ThemeConfig | null> {
  const themeLoader = THEME_REGISTRY[name as keyof typeof THEME_REGISTRY];
  if (!themeLoader) {
    console.warn(
      `Theme '${name}' not found in registry. Available themes:`,
      Object.keys(THEME_REGISTRY)
    );

    // Fallback to default theme if the requested theme doesn't exist
    if (name !== 'default') {
      console.log(`Falling back to default theme`);
      return loadTheme('default');
    }

    return null;
  }

  try {
    const theme = await themeLoader();
    return theme;
  } catch (error) {
    console.error(`Error loading theme '${name}':`, error);

    // Fallback to default theme on error
    if (name !== 'default') {
      console.log(`Error loading '${name}', falling back to default theme`);
      return loadTheme('default');
    }

    return null;
  }
}

// Load all themes (only when needed)
export async function loadAllThemes(): Promise<ThemeConfig[]> {
  const themeNames = getAvailableThemeNames();

  try {
    const themePromises = themeNames.map(name => loadTheme(name));
    const themes = await Promise.all(themePromises);

    // Filter out null values (failed loads)
    const validThemes = themes.filter(
      (theme): theme is ThemeConfig => theme !== null
    );

    console.log(
      `Loaded ${validThemes.length} themes:`,
      validThemes.map(t => t.name)
    );
    return validThemes;
  } catch (error) {
    console.error('Error loading themes:', error);
    return [];
  }
}

// Cache for individual loaded themes
const themeCache = new Map<string, ThemeConfig>();

// Get all available themes (lazy loaded with caching)
export async function getAvailableThemes(): Promise<ThemeConfig[]> {
  const themeNames = getAvailableThemeNames();

  // Load only themes that aren't cached yet
  const uncachedThemes = themeNames.filter(name => !themeCache.has(name));

  if (uncachedThemes.length > 0) {
    const loadPromises = uncachedThemes.map(async name => {
      const theme = await loadTheme(name);
      if (theme) {
        themeCache.set(name, theme);
      }
      return theme;
    });

    await Promise.all(loadPromises);
  }

  // Return all cached themes
  return Array.from(themeCache.values());
}

// Theme display names mapping
const THEME_DISPLAY_NAMES: Record<string, string> = {
  default: 'Default',
  ocean: 'Ocean',
  forest: 'Forest',
  earth: 'Earth',
  fire: 'Fire',
  air: 'Air',
};

// Get theme metadata without loading the full theme
export function getThemeMetadata(): Array<{
  name: string;
  displayName: string;
}> {
  return getAvailableThemeNames().map(name => ({
    name,
    displayName:
      THEME_DISPLAY_NAMES[name] || name.charAt(0).toUpperCase() + name.slice(1),
  }));
}

// Get theme by name (lazy loaded with caching)
export async function getThemeByName(
  name: string
): Promise<ThemeConfig | undefined> {
  // Check cache first
  if (themeCache.has(name)) {
    return themeCache.get(name);
  }

  // Load theme if not cached
  const theme = await loadTheme(name);
  if (theme) {
    themeCache.set(name, theme);
  }

  return theme || undefined;
}

// Clear cache (useful for development or when themes are updated)
export function clearThemeCache(): void {
  themeCache.clear();
}

// Clean up invalid theme preferences
export function cleanupInvalidThemePreference(): void {
  try {
    const saved = localStorage.getItem('theme-preference');
    if (saved) {
      const preference = JSON.parse(saved);
      const availableNames = getAvailableThemeNames();

      if (
        preference.themeName &&
        !availableNames.includes(preference.themeName)
      ) {
        console.log(
          `Invalid theme preference '${preference.themeName}' found. Clearing preference to fallback to default.`
        );
        localStorage.removeItem('theme-preference');
      }
    }
  } catch (error) {
    console.error('Error cleaning up theme preference:', error);
    localStorage.removeItem('theme-preference');
  }
}
