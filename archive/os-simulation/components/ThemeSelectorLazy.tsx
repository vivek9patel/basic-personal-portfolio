import React, { useState, useEffect } from 'react';
import { getThemeMetadata, getThemeByName } from '../themes';
import { useThemeManager } from '../hooks/useThemeManager';
import ReactGA from 'react-ga4';

interface ThemeMetadata {
  name: string;
  displayName: string;
}

interface ThemeSelectorLazyProps {
  compact?: boolean;
}

const ThemeSelectorLazy: React.FC<ThemeSelectorLazyProps> = ({
  compact = false,
}) => {
  const { currentTheme, setTheme, isLoading } = useThemeManager();
  const [themeMetadata, setThemeMetadata] = useState<ThemeMetadata[]>([]);
  const [isLoadingTheme, setIsLoadingTheme] = useState(false);
  const [previewColors, setPreviewColors] = useState<Record<string, string>>(
    {}
  );

  // Load theme metadata on mount (lightweight)
  useEffect(() => {
    const metadata = getThemeMetadata();
    setThemeMetadata(metadata);
  }, []);

  // Load preview colors for themes (lazy loaded)
  const loadPreviewColor = async (themeName: string) => {
    if (previewColors[themeName]) return; // Already loaded

    try {
      const theme = await getThemeByName(themeName);
      if (theme) {
        setPreviewColors(prev => ({
          ...prev,
          [themeName]: theme.colors.light.primary,
        }));
      }
    } catch (error) {
      console.error(`Failed to load preview for ${themeName}:`, error);
    }
  };

  // Handle theme selection
  const handleThemeSelect = async (themeName: string) => {
    // Track theme selection in lazy selector
    ReactGA.event({
      category: 'Theme',
      action: 'Theme Change (Lazy)',
      label: themeName,
      value: 1,
    });

    setIsLoadingTheme(true);
    try {
      await setTheme(themeName);
    } catch (error) {
      console.error('Failed to set theme:', error);
    } finally {
      setIsLoadingTheme(false);
    }
  };

  // Load preview colors on hover
  const handleThemeHover = (themeName: string) => {
    loadPreviewColor(themeName);
  };

  if (compact) {
    return (
      <div className="relative">
        <select
          value={currentTheme?.name || 'default'}
          onChange={e => handleThemeSelect(e.target.value)}
          disabled={isLoading || isLoadingTheme}
          className="px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {themeMetadata.map(theme => (
            <option key={theme.name} value={theme.name}>
              {theme.displayName}
            </option>
          ))}
        </select>
        {(isLoading || isLoadingTheme) && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {themeMetadata.map(theme => (
        <button
          key={theme.name}
          onClick={() => handleThemeSelect(theme.name)}
          onMouseEnter={() => handleThemeHover(theme.name)}
          disabled={isLoading || isLoadingTheme}
          className={`
            relative p-4 rounded-lg border-2 transition-all duration-200
            ${
              currentTheme?.name === theme.name
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50 hover:bg-accent/5'
            }
            ${isLoading || isLoadingTheme ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          <div className="flex items-center space-x-3">
            <div
              className="w-6 h-6 rounded-full border-2 border-border"
              style={{
                backgroundColor: previewColors[theme.name] || '#ccc',
                opacity: previewColors[theme.name] ? 1 : 0.5,
              }}
            />
            <div className="text-left">
              <div className="font-medium text-sm">{theme.displayName}</div>
              <div className="text-xs text-muted-foreground capitalize">
                {theme.name}
              </div>
            </div>
          </div>

          {currentTheme?.name === theme.name && (
            <div className="absolute top-2 right-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
            </div>
          )}

          {(isLoading || isLoadingTheme) &&
            currentTheme?.name === theme.name && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg">
                <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full" />
              </div>
            )}
        </button>
      ))}
    </div>
  );
};

export { ThemeSelectorLazy };
export default ThemeSelectorLazy;
