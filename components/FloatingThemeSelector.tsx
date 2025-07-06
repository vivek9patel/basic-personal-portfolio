import React, { useState, useEffect } from 'react';
import { useThemeManager } from '../hooks/useThemeManager';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { cn } from '@/lib/utils';
import ReactGA from 'react-ga4';
import {
  Palette,
  Flame,
  Waves,
  TreePine,
  Mountain,
  Wind,
  Sparkles,
} from 'lucide-react';

interface ThemeOption {
  name: string;
  displayName: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const themeOptions: ThemeOption[] = [
  {
    name: 'default',
    displayName: 'Default',
    icon: Sparkles,
    description: 'Classic theme',
  },
  {
    name: 'fire',
    displayName: 'Fire',
    icon: Flame,
    description: 'Warm and energetic',
  },
  {
    name: 'ocean',
    displayName: 'Ocean',
    icon: Waves,
    description: 'Cool and calming',
  },
  {
    name: 'forest',
    displayName: 'Forest',
    icon: TreePine,
    description: 'Natural and fresh',
  },
  {
    name: 'earth',
    displayName: 'Earth',
    icon: Mountain,
    description: 'Grounded and stable',
  },
  {
    name: 'air',
    displayName: 'Air',
    icon: Wind,
    description: 'Light and airy',
  },
];

export interface FloatingThemeSelectorProps {
  className?: string;
}

export const FloatingThemeSelector: React.FC<FloatingThemeSelectorProps> = ({
  className = '',
}) => {
  const { currentTheme, mode, setTheme, isLoading } = useThemeManager();

  const [isOpen, setIsOpen] = useState(false);
  const [animatedButtons, setAnimatedButtons] = useState<number[]>([]);

  const handleThemeSelect = (themeName: string) => {
    ReactGA.event({
      category: 'Theme',
      action: 'Floating Theme Change',
      label: themeName,
      value: 1,
    });

    setTheme(themeName);
    setIsOpen(false);
  };

  const toggleThemeOptions = () => {
    ReactGA.event({
      category: 'Theme',
      action: isOpen ? 'Close Floating Theme Menu' : 'Open Floating Theme Menu',
      label: currentTheme?.name || 'unknown',
      value: 1,
    });

    setIsOpen(!isOpen);

    if (!isOpen) {
      // Reset animated buttons when opening
      setAnimatedButtons([]);

      // Animate buttons one by one
      themeOptions.forEach((_, index) => {
        setTimeout(() => {
          setAnimatedButtons(prev => [...prev, index]);
        }, index * 80); // Increased delay for more noticeable sequential effect
      });
    }
  };

  // Calculate position for each theme option button
  const getThemeOptionPosition = (index: number) => {
    const totalOptions = themeOptions.length;
    const radius =
      typeof window !== 'undefined' && window.innerWidth < 768 ? 100 : 100; // Increased radius for more spacing
    const startAngle = 120; // Start angle (in degrees)
    const endAngle = 240; // End angle (in degrees)
    const angleStep = (endAngle - startAngle) / (totalOptions - 1);
    const angle = startAngle + index * angleStep;
    const radian = (angle * Math.PI) / 180;

    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;

    return { x, y };
  };

  // Close menu when clicking outside or on scroll
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        isOpen &&
        !(e.target as Element).closest('.floating-theme-selector')
      ) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleOutsideClick);
      document.addEventListener('scroll', handleScroll);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen]);

  // Clean up animated buttons when closing
  useEffect(() => {
    if (!isOpen) {
      setAnimatedButtons([]);
    }
  }, [isOpen]);

  if (isLoading) {
    return (
      <div className={cn('flex flex-col items-center', className)}>
        <div className="flex items-center justify-center w-10 h-10 border-2 border-muted border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div
        className={cn(
          'flex flex-col items-center floating-theme-selector',
          className
        )}
      >
        <div className="relative">
          {/* Theme Option Buttons */}
          {isOpen &&
            themeOptions.map((theme, index) => {
              const position = getThemeOptionPosition(index);
              const IconComponent = theme.icon;
              const isActive = currentTheme?.name === theme.name;
              const isAnimated = animatedButtons.includes(index);

              return (
                <div
                  key={theme.name}
                  className="absolute"
                  style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                  }}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={() => handleThemeSelect(theme.name)}
                        variant={isActive ? 'default' : 'outline'}
                        size="icon"
                        className={cn(
                          'w-9 h-9 rounded-full transition-all duration-150 transform',
                          'hover:scale-110 shadow-md',
                          'will-change-transform',
                          isAnimated
                            ? 'scale-100 opacity-100 animate-in zoom-in-50 slide-in-from-bottom-2'
                            : 'scale-0 opacity-0',
                          isActive &&
                            'ring-2 ring-primary ring-offset-2 ring-offset-background'
                        )}
                        style={{
                          transformOrigin: 'center',
                          animation: isAnimated
                            ? 'popupBounce 0.5s ease-out forwards'
                            : undefined,
                        }}
                      >
                        <IconComponent className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                      <p className="font-medium">{theme.displayName}</p>
                      <p className="text-xs text-foreground">
                        {theme.description}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              );
            })}

          {/* Main Theme Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={toggleThemeOptions}
                id="theme-selector-button"
                variant="outline"
                size="icon"
                data-cursor={true}
                className={cn(
                  'w-10 h-10 rounded-full border border-border bg-background hover:border-primary',
                  'group transition-all duration-300 transform',
                  'shadow-xs text-foreground hover:text-white',
                  isOpen && 'rotate-180 scale-110'
                )}
              >
                <Palette
                  data-cursor="theme-selector-button"
                  className="w-5 h-5"
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Theme Settings</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Badge */}
        <Badge
          variant="secondary"
          className={cn(
            'mt-2 text-sm font-light border-0 bg-transparent text-foreground',
            'transition-all duration-300 text-center',
            isOpen && 'opacity-50'
          )}
        >
          {currentTheme?.displayName || 'Default'}
        </Badge>
      </div>
    </TooltipProvider>
  );
};

export default FloatingThemeSelector;
