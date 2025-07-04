module.exports = {
  darkMode: ["class", "class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: 'var(--font-sans)',
  			serif: 'var(--font-serif)',
  			mono: 'var(--font-mono)'
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
  		typography: '({ theme }) => ({\n        dark: {\n          css: {\n            "--tw-prose-counters": theme("colors.white"),\n            "--tw-prose-body": theme("colors.white"),\n            "--tw-prose-headings": theme("colors.white"),\n            // "--tw-prose-lead": theme("colors.pink[700]"),\n            "--tw-prose-links": theme("colors.primary.DEFAULT"),\n            "--tw-prose-bold": theme("colors.white"),\n            "--tw-prose-counters": theme("colors.white"),\n            "--tw-prose-bullets": theme("colors.white"),\n            "--tw-prose-hr": theme("colors.white"),\n            "--tw-prose-quotes": theme("colors.white"),\n            "--tw-prose-quote-borders": theme("colors.white"),\n            "--tw-prose-captions": theme("colors.white"),\n            "--tw-prose-code": theme("colors.white"),\n            "--tw-prose-pre-code": theme("colors.white"),\n            // "--tw-prose-pre-bg": theme("colors.pink[900]"),\n            "--tw-prose-th-borders": theme("colors.white"),\n            "--tw-prose-td-borders": theme("colors.white"),\n          },\n        },\n      })',
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
};
