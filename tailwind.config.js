/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#c7d4ee",
          100: "#abbee6",
          200: "#8fa8dd",
          300: "#577ccc",
          400: "#3b66c4",
          500: "#2d5bc0",
          600: "#1e50bb",
          700: "#163c8e",
          800: "#0e2860",
          900: "#08193f",
        },
      }
    },
  },
  plugins: [],
}
