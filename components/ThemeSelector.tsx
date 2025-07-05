import React, { useState } from 'react';
import { useThemeManager } from '../hooks/useThemeManager';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { Palette, Sun, Moon, Eye, X, RotateCcw } from 'lucide-react';
import ReactGA from 'react-ga4';

interface ThemePreviewProps {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
  };
  name: string;
  mode: 'light' | 'dark';
}

const ThemePreview: React.FC<ThemePreviewProps> = ({ colors, name, mode }) => (
  <div className="flex items-center space-x-2">
    <div className="flex space-x-1">
      <div
        className="w-4 h-4 rounded-full border border-gray-300"
        style={{ backgroundColor: colors.primary }}
        title={`Primary: ${colors.primary}`}
      />
      <div
        className="w-4 h-4 rounded-full border border-gray-300"
        style={{ backgroundColor: colors.secondary }}
        title={`Secondary: ${colors.secondary}`}
      />
      <div
        className="w-4 h-4 rounded-full border border-gray-300"
        style={{ backgroundColor: colors.accent }}
        title={`Accent: ${colors.accent}`}
      />
    </div>
    <span className="text-sm font-medium">{name}</span>
    <Badge variant="outline" className="text-xs">
      {mode === 'light' ? (
        <Sun className="w-3 h-3" />
      ) : (
        <Moon className="w-3 h-3" />
      )}
    </Badge>
  </div>
);

export interface ThemeSelectorProps {
  className?: string;
  showPreview?: boolean;
  compact?: boolean;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  className = '',
  showPreview = true,
  compact = false,
}) => {
  const {
    currentTheme,
    themes,
    themeMetadata,
    mode,
    setTheme,
    toggleMode,
    isLoading,
    resetToDefault,
    previewTheme,
    cancelPreview,
  } = useThemeManager();

  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const handleThemeSelect = (themeName: string) => {
    // Track theme selection
    ReactGA.event({
      category: 'Theme',
      action: isPreviewMode ? 'Theme Preview' : 'Theme Change',
      label: themeName,
      value: 1,
    });

    if (isPreviewMode) {
      const selectedTheme = themes.find(t => t.name === themeName);
      if (selectedTheme) {
        previewTheme(selectedTheme, mode);
      }
    } else {
      setTheme(themeName);
    }
  };

  const handlePreviewToggle = () => {
    // Track preview mode toggle
    ReactGA.event({
      category: 'Theme',
      action: isPreviewMode ? 'Exit Preview Mode' : 'Enter Preview Mode',
      label: currentTheme?.name || 'unknown',
      value: 1,
    });

    if (isPreviewMode) {
      cancelPreview();
    }
    setIsPreviewMode(!isPreviewMode);
  };

  const handleApplyPreview = () => {
    if (currentTheme) {
      // Track preview application
      ReactGA.event({
        category: 'Theme',
        action: 'Apply Preview',
        label: currentTheme.name,
        value: 1,
      });

      setTheme(currentTheme.name);
      setIsPreviewMode(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 border-2 border-muted border-t-primary rounded-full animate-spin" />
        <span className="text-sm text-muted-foreground">Loading themes...</span>
      </div>
    );
  }

  if (compact) {
    return (
      <div className={`flex items-center gap-1 sm:gap-2 ${className}`}>
        <Select
          value={currentTheme?.name || 'default'}
          onValueChange={handleThemeSelect}
        >
          <SelectTrigger className="w-16 xs:w-20 sm:w-24 md:w-28 lg:w-32 text-xs sm:text-sm h-8 sm:h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent
            align="end"
            side="bottom"
            sideOffset={4}
            className="w-32 sm:w-36 md:w-40 max-w-[90vw]"
            collisionPadding={8}
          >
            {themeMetadata.map(theme => (
              <SelectItem
                key={theme.name}
                value={theme.name}
                className="text-xs sm:text-sm"
              >
                <span className="truncate">{theme.displayName}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  // Track mode toggle
                  ReactGA.event({
                    category: 'Theme',
                    action: 'Mode Toggle',
                    label: `${mode} to ${mode === 'light' ? 'dark' : 'light'}`,
                    value: 1,
                  });
                  toggleMode();
                }}
                className="p-1 sm:p-2 h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0"
              >
                {mode === 'light' ? (
                  <Sun className="h-3 w-3 sm:h-4 sm:w-4" />
                ) : (
                  <Moon className="h-3 w-3 sm:h-4 sm:w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" align="end">
              <p className="text-xs">
                Toggle {mode === 'light' ? 'dark' : 'light'} mode
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  }

  return (
    <Card className={`w-full max-w-md ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Palette className="w-5 h-5" />
          <span>Theme Settings</span>
        </CardTitle>
        <CardDescription>Customize your visual experience</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Theme Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Theme</label>
          <Select
            value={currentTheme?.name || 'default'}
            onValueChange={handleThemeSelect}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {themes.map(theme => (
                <SelectItem key={theme.name} value={theme.name}>
                  <div className="flex items-center justify-between w-full">
                    <span>{theme.displayName}</span>
                    {showPreview && (
                      <div className="flex space-x-1 ml-2">
                        <div
                          className="w-3 h-3 rounded-full border"
                          style={{
                            backgroundColor: theme.colors[mode].primary,
                          }}
                        />
                        <div
                          className="w-3 h-3 rounded-full border"
                          style={{ backgroundColor: theme.colors[mode].accent }}
                        />
                      </div>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Mode Toggle */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Mode</label>
          <div className="flex space-x-2">
            <Button
              variant={mode === 'light' ? 'default' : 'outline'}
              size="sm"
              onClick={() => mode !== 'light' && toggleMode()}
              className="flex-1"
            >
              <Sun className="w-4 h-4 mr-2" />
              Light
            </Button>
            <Button
              variant={mode === 'dark' ? 'default' : 'outline'}
              size="sm"
              onClick={() => mode !== 'dark' && toggleMode()}
              className="flex-1"
            >
              <Moon className="w-4 h-4 mr-2" />
              Dark
            </Button>
          </div>
        </div>

        {/* Current Theme Preview */}
        {showPreview && currentTheme && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Current Theme</label>
            <div className="p-3 border rounded-lg bg-muted/50">
              <ThemePreview
                colors={{
                  primary: currentTheme.colors[mode].primary,
                  secondary: currentTheme.colors[mode].secondary,
                  accent: currentTheme.colors[mode].accent,
                  background: currentTheme.colors[mode].background,
                  foreground: currentTheme.colors[mode].foreground,
                }}
                name={currentTheme.displayName}
                mode={mode}
              />
            </div>
          </div>
        )}

        {/* Preview Controls */}
        <div className="flex space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePreviewToggle}
                  className="flex-1"
                >
                  {isPreviewMode ? (
                    <>
                      <X className="w-4 h-4 mr-2" />
                      Cancel Preview
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-2" />
                      Preview Mode
                    </>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {isPreviewMode
                    ? 'Exit preview mode'
                    : 'Enter preview mode to test themes'}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={resetToDefault}>
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Reset to default theme</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {isPreviewMode && (
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
              Preview mode is active. Select themes to preview them instantly.
            </p>
            <Button size="sm" onClick={handleApplyPreview} className="w-full">
              Apply Current Preview
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
