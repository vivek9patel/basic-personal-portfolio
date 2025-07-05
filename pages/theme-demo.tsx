import React from 'react';
import { NextPage } from 'next';
import { ThemeSelector } from '../components/ThemeSelector';
import { useThemeManager } from '../hooks/useThemeManager';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';

const ThemeDemo: NextPage = () => {
  const { currentTheme, mode } = useThemeManager();

  if (!currentTheme) {
    return (
      <div className="min-h-screen bg-background text-foreground p-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Loading Theme...</h1>
          <p className="text-muted-foreground">
            Please wait while the theme loads.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Theme Management Demo</h1>
          <p className="text-lg text-muted-foreground">
            Test the dynamic theme switching system
          </p>
          <div className="flex justify-center items-center space-x-2">
            <Badge variant="outline">Current: {currentTheme.displayName}</Badge>
            <Badge variant="outline">Mode: {mode}</Badge>
          </div>
        </div>

        <Separator />

        {/* Theme Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Theme Controls</h2>
            <ThemeSelector />
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Compact Version</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                This is how the theme selector looks in compact mode:
              </p>
              <ThemeSelector compact />
            </div>
          </div>
        </div>

        <Separator />

        {/* Component Showcase */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Component Showcase</h2>
          <p className="text-muted-foreground">
            Here are various components styled with the current theme:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card Example */}
            <Card>
              <CardHeader>
                <CardTitle>Sample Card</CardTitle>
                <CardDescription>
                  This card demonstrates the current theme colors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    This is some sample content in a card component.
                  </p>
                  <div className="flex space-x-2">
                    <Button size="sm">Primary</Button>
                    <Button variant="secondary" size="sm">
                      Secondary
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Color Palette */}
            <Card>
              <CardHeader>
                <CardTitle>Color Palette</CardTitle>
                <CardDescription>Current theme colors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <div className="w-full h-8 bg-primary rounded flex items-center justify-center text-primary-foreground text-xs font-medium">
                      Primary
                    </div>
                    <div className="w-full h-8 bg-secondary rounded flex items-center justify-center text-secondary-foreground text-xs font-medium">
                      Secondary
                    </div>
                    <div className="w-full h-8 bg-accent rounded flex items-center justify-center text-accent-foreground text-xs font-medium">
                      Accent
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-8 bg-muted rounded flex items-center justify-center text-muted-foreground text-xs font-medium">
                      Muted
                    </div>
                    <div className="w-full h-8 bg-destructive rounded flex items-center justify-center text-destructive-foreground text-xs font-medium">
                      Destructive
                    </div>
                    <div className="w-full h-8 border border-border rounded flex items-center justify-center text-foreground text-xs font-medium">
                      Border
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Buttons */}
            <Card>
              <CardHeader>
                <CardTitle>Button Variants</CardTitle>
                <CardDescription>Different button styles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm">Default</Button>
                    <Button variant="secondary" size="sm">
                      Secondary
                    </Button>
                    <Button variant="outline" size="sm">
                      Outline
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="destructive" size="sm">
                      Destructive
                    </Button>
                    <Button variant="ghost" size="sm">
                      Ghost
                    </Button>
                    <Button variant="link" size="sm">
                      Link
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator />

        {/* Theme Information */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Current Theme Details</h2>
          <Card>
            <CardHeader>
              <CardTitle>{currentTheme.displayName} Theme</CardTitle>
              <CardDescription>Theme configuration details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Theme Properties</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name:</span>
                      <span>{currentTheme.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Display Name:
                      </span>
                      <span>{currentTheme.displayName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Border Radius:
                      </span>
                      <span>{currentTheme.radius}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Font Family:
                      </span>
                      <span className="truncate">
                        {currentTheme.fonts.sans}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">
                    Current Colors ({mode} mode)
                  </h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Primary:</span>
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-4 h-4 rounded border"
                          style={{
                            backgroundColor: currentTheme.colors[mode].primary,
                          }}
                        />
                        <span className="font-mono text-xs">
                          {currentTheme.colors[mode].primary}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Accent:</span>
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-4 h-4 rounded border"
                          style={{
                            backgroundColor: currentTheme.colors[mode].accent,
                          }}
                        />
                        <span className="font-mono text-xs">
                          {currentTheme.colors[mode].accent}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Background:</span>
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-4 h-4 rounded border"
                          style={{
                            backgroundColor:
                              currentTheme.colors[mode].background,
                          }}
                        />
                        <span className="font-mono text-xs">
                          {currentTheme.colors[mode].background}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ThemeDemo;
