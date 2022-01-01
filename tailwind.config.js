module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Wotfard', 'sans-serif'],
      },
      colors: {
        'v9-purple': '#162447',
        'v9-cyan': '#00FFFF',
        'v9-teal': '#64FFDA',
        'v9-dark-teal': '#00FFC2',
        'v9-pink': '#FD3A69'
      }
    },
  },
  plugins: [],
}
