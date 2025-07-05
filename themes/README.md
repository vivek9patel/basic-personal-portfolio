# Theme Management System

This directory contains the dynamic theme management system for the application.

## Structure

```
themes/
├── types.ts          # TypeScript interfaces for theme configuration
├── loader.ts         # Dynamic theme loading utilities
├── index.ts          # Main exports and public API
├── data/             # Theme configuration files
│   ├── index.ts      # Auto-exports all themes
│   ├── default.ts    # Default theme
│   ├── ocean.ts      # Ocean theme
│   └── forest.ts     # Forest theme (example)
└── README.md         # This file
```

## How to Add a New Theme

Adding a new theme is incredibly simple and requires no changes to the core system:

### Step 1: Create a New Theme File

Create a new TypeScript file in the `themes/data/` directory:

```typescript
// themes/data/sunset.ts
import { ThemeConfig } from '../types';

export const sunsetTheme: ThemeConfig = {
  name: 'sunset',
  displayName: 'Sunset',
  colors: {
    light: {
      background: '#fff8f0',
      foreground: '#8b4513',
      primary: '#ff6b35',
      // ... complete all required color properties
    },
    dark: {
      background: '#2d1b0e',
      foreground: '#ffd4a3',
      primary: '#ff8c42',
      // ... complete all required color properties
    },
  },
  fonts: {
    sans: 'Inter, sans-serif',
    serif: 'Georgia, serif',
    mono: 'JetBrains Mono, monospace',
  },
  radius: '8px',
  shadows: {
    // ... define shadow styles
  },
  trackingNormal: '0em',
  spacing: '0.25rem',
};
```

### Step 2: Add Export to Index File

Add your theme to `themes/data/index.ts`:

```typescript
// Add to exports
export { sunsetTheme } from './sunset';

// Add to imports
import { sunsetTheme } from './sunset';

// Add to allThemes array
export const allThemes = [
  defaultTheme,
  oceanTheme,
  forestTheme,
  sunsetTheme,  // Add here
];
```

### Step 3: That's It!

Your theme is now automatically:
- ✅ Available in the theme selector
- ✅ Fully functional with light/dark modes
- ✅ Persistent across sessions
- ✅ Compatible with all theme features

## Theme Configuration

Each theme must implement the `ThemeConfig` interface with these properties:

### Required Properties

- `name`: Unique identifier (lowercase, no spaces)
- `displayName`: Human-readable name for UI
- `colors`: Object with `light` and `dark` mode colors
- `fonts`: Font family definitions
- `radius`: Border radius value
- `shadows`: Shadow definitions
- `trackingNormal`: Letter spacing
- `spacing`: Base spacing unit

### Color Properties

Each color mode (light/dark) must include all these properties:

```typescript
{
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
  chart1: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;
  sidebar: string;
  sidebarForeground: string;
  sidebarPrimary: string;
  sidebarPrimaryForeground: string;
  sidebarAccent: string;
  sidebarAccentForeground: string;
  sidebarBorder: string;
  sidebarRing: string;
}
```

## Best Practices

1. **Naming**: Use descriptive, lowercase names without spaces
2. **Colors**: Ensure good contrast ratios for accessibility
3. **Consistency**: Follow the existing theme patterns
4. **Testing**: Test both light and dark modes thoroughly
5. **Documentation**: Add comments for complex color choices