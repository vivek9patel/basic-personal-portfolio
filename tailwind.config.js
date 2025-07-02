module.exports = {
  darkMode: ["class", "class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: [
  				'Inter',
  				'sans-serif'
  			]
  		},
  		colors: {
  			'ubuntu-orange': '#E95420',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		typography: '({ theme }) => ({\n        dark: {\n          css: {\n            "--tw-prose-counters": theme("colors.white"),\n            "--tw-prose-body": theme("colors.white"),\n            "--tw-prose-headings": theme("colors.white"),\n            // "--tw-prose-lead": theme("colors.pink[700]"),\n            "--tw-prose-links": theme("colors.accent.DEFAULT"),\n            "--tw-prose-bold": theme("colors.white"),\n            "--tw-prose-counters": theme("colors.white"),\n            "--tw-prose-bullets": theme("colors.white"),\n            "--tw-prose-hr": theme("colors.white"),\n            "--tw-prose-quotes": theme("colors.white"),\n            "--tw-prose-quote-borders": theme("colors.white"),\n            "--tw-prose-captions": theme("colors.white"),\n            "--tw-prose-code": theme("colors.white"),\n            "--tw-prose-pre-code": theme("colors.white"),\n            // "--tw-prose-pre-bg": theme("colors.pink[900]"),\n            "--tw-prose-th-borders": theme("colors.white"),\n            "--tw-prose-td-borders": theme("colors.white"),\n          },\n        },\n      })',
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
};
