import { useThemeManager } from '@/hooks/useThemeManager';
import { DEFAULT_THEME_NAME } from '@/themes';
import { Moon, Sun, Palette } from 'lucide-react';
import ReactGA from 'react-ga4';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function ThemeControls() {
  const { currentTheme, themeMetadata, mode, setTheme, toggleMode, isLoading } =
    useThemeManager();

  const handleThemeSelect = (themeName: string) => {
    ReactGA.event({
      category: 'Theme',
      action: 'Theme Change',
      label: themeName,
      value: 1,
    });
    setTheme(themeName);
  };

  if (isLoading) {
    return (
      <div className="h-9 w-9 rounded-full border-2 border-muted border-t-primary animate-spin" />
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Select
        value={currentTheme?.name || DEFAULT_THEME_NAME}
        onValueChange={handleThemeSelect}
      >
        <SelectTrigger
          className="h-9 w-auto gap-2 border border-border bg-card"
          aria-label="Select color theme"
          data-cursor={true}
        >
          <Palette className="h-4 w-4 shrink-0" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent align="end">
          {themeMetadata.map(theme => (
            <SelectItem key={theme.name} value={theme.name}>
              {theme.displayName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        variant="outline"
        size="icon"
        onClick={toggleMode}
        aria-label="Toggle light and dark mode"
        data-cursor={true}
        className="h-9 w-9 border border-border bg-card hover:bg-accent"
      >
        {mode === 'dark' ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
