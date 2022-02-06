module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Wotfard", "sans-serif"],
      },
      colors: {
        "v9-purple": "#162447",
        "v9-cyan": "#00FFFF",
        "v9-teal": "#64FFDA",
        "v9-dark-teal": "#00FFC2",
        "v9-pink": "#FD3A69",
      },
      typography: ({ theme }) => ({
        dark: {
          css: {
            "--tw-prose-counters": theme("colors.white"),
            "--tw-prose-body": theme("colors.white"),
            "--tw-prose-headings": theme("colors.white"),
            // "--tw-prose-lead": theme("colors.pink[700]"),
            "--tw-prose-links": theme("colors.v9-pink"),
            "--tw-prose-bold": theme("colors.white"),
            "--tw-prose-counters": theme("colors.white"),
            "--tw-prose-bullets": theme("colors.white"),
            "--tw-prose-hr": theme("colors.white"),
            "--tw-prose-quotes": theme("colors.white"),
            "--tw-prose-quote-borders": theme("colors.white"),
            "--tw-prose-captions": theme("colors.white"),
            "--tw-prose-code": theme("colors.white"),
            "--tw-prose-pre-code": theme("colors.white"),
            // "--tw-prose-pre-bg": theme("colors.pink[900]"),
            "--tw-prose-th-borders": theme("colors.white"),
            "--tw-prose-td-borders": theme("colors.white"),
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
