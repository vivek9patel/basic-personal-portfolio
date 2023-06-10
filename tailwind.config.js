module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        "v9-light-grey": "#d4cfcf",
        "v9-dark-grey": "#182635",
        "v9-purple": "#162447",
        "v9-cyan": "#00FFFF",
        "v9-teal": "#00ffdc",
        "v9-dark-teal": "#00FFC2",
        "v9-pink": "#FF55BB",
        "v9-yellow": "#FEFF86",
        "v9-green": "#30C85E",
        "v9-blue": "#4A97FE",
        "v9-primary-black": "#181818",
        "v9-secondary-black": "#1E1E1F",
        "ubuntu-orange": "#E95420",
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
