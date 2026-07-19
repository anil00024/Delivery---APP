/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#171A21",
          50: "#F4F5F7",
          100: "#E4E6EA",
          200: "#C7CAD1",
          400: "#5B606C",
          700: "#23272F",
          800: "#1A1D24",
          900: "#0D0F14",
        },
        paper: {
          DEFAULT: "#FBF8F2",
          100: "#F5F0E4",
          200: "#EDE6D6",
        },
        marigold: {
          50: "#FFF3E9",
          100: "#FFE1C7",
          300: "#FFB273",
          400: "#FF9142",
          500: "#FF6B1A",
          600: "#E85D0A",
          700: "#C94E05",
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', "sans-serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      boxShadow: {
        stamp: "2px 2px 0 rgba(23,26,33,0.9)",
      },
    },
  },
  plugins: [],
};
