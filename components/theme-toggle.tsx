import { useThemeManager } from '@/hooks/useThemeManager';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ThemeToggle() {
  const { mode, toggleMode } = useThemeManager();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleMode}
      aria-label="Toggle light and dark mode"
      data-cursor={true}
      className="border border-border bg-card hover:bg-accent"
    >
      {mode === 'dark' ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  );
}
