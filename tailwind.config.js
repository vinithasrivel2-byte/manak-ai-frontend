/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        doca: {
          950: "#050C1A",
          900: "#0A192F",
          800: "#112240",
          700: "#1E3A8A",
          600: "#2563EB",
          500: "#3B82F6",
        },
        bis: {
          gold: "#D97706",
          saffron: "#F97316",
          lightGold: "#FEF3C7",
        }
      }
    },
  },
  plugins: [],
}
