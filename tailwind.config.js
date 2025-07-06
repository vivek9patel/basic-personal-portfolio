const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: ["class", "class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // Safelist for dynamic classes that might be purged
  safelist: [
    'animate-spin',
    'animate-pulse',
    'loading-spinner',
    'hero-section',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        serif: ['var(--font-serif)', ...fontFamily.serif],
        mono: ['var(--font-mono)', ...fontFamily.mono],
      },
      colors: {
        'ubuntu-orange': '#E95420',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)'
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)'
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)'
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)'
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)'
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)'
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)'
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        chart: {
          '1': 'var(--chart-1)',
          '2': 'var(--chart-2)',
          '3': 'var(--chart-3)',
          '4': 'var(--chart-4)',
          '5': 'var(--chart-5)'
        }
      },
      boxShadow: {
        '2xs': 'var(--shadow-2xs)',
        'xs': 'var(--shadow-xs)',
        'sm': 'var(--shadow-sm)',
        'DEFAULT': 'var(--shadow)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
      },
      // Optimized typography configuration
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: theme('colors.foreground'),
            h1: {
              color: theme('colors.foreground'),
              fontWeight: '800',
            },
            h2: {
              color: theme('colors.foreground'),
              fontWeight: '700',
            },
            h3: {
              color: theme('colors.foreground'),
              fontWeight: '600',
            },
            strong: {
              color: theme('colors.foreground'),
              fontWeight: '600',
            },
            code: {
              color: theme('colors.foreground'),
              backgroundColor: theme('colors.muted.DEFAULT'),
              paddingLeft: '0.25rem',
              paddingRight: '0.25rem',
              paddingTop: '0.125rem',
              paddingBottom: '0.125rem',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: theme('colors.muted.DEFAULT'),
              color: theme('colors.foreground'),
              borderRadius: '0.5rem',
              padding: '1rem',
              overflow: 'auto',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
              borderRadius: '0',
            },
            a: {
              color: theme('colors.primary.DEFAULT'),
              textDecoration: 'underline',
              fontWeight: '500',
              '&:hover': {
                color: theme('colors.primary.DEFAULT'),
                opacity: '0.8',
              },
            },
            blockquote: {
              color: theme('colors.muted.foreground'),
              borderLeftColor: theme('colors.border'),
              borderLeftWidth: '4px',
              paddingLeft: '1rem',
              fontStyle: 'italic',
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.foreground'),
            h1: { color: theme('colors.foreground') },
            h2: { color: theme('colors.foreground') },
            h3: { color: theme('colors.foreground') },
            strong: { color: theme('colors.foreground') },
            code: { 
              color: theme('colors.foreground'),
              backgroundColor: theme('colors.muted.DEFAULT'),
            },
            pre: {
              backgroundColor: theme('colors.muted.DEFAULT'),
              color: theme('colors.foreground'),
            },
            blockquote: {
              color: theme('colors.muted.foreground'),
              borderLeftColor: theme('colors.border'),
            },
            a: {
              color: theme('colors.primary.DEFAULT'),
              '&:hover': {
                color: theme('colors.primary.DEFAULT'),
                opacity: '0.8',
              },
            },
          },
        },
      }),
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      // Performance optimizations
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      // Reduce unused utilities
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
    }
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
  ],
  // Performance optimizations
  corePlugins: {
    // Disable unused plugins to reduce bundle size
    preflight: true,
    container: false, // Use CSS Grid instead
    float: false,
    clear: false,
    skew: false,
    caretColor: false,
    sepia: false,
    filter: false,
    backdropFilter: false,
  },
  // Optimize for production
  future: {
    hoverOnlyWhenSupported: true,
  },
};
