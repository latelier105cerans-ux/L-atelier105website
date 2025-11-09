import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/components/**/*.{js,vue,ts}",
    "./app/layouts/**/*.vue",
    "./app/pages/**/*.vue",
    "./app/plugins/**/*.{js,ts}",
    "./app/app.vue",
  ],
  theme: {
    extend: {
      screens: {
        // Mobile first approach - default styles are for mobile
        desktopview: "1024px", // Desktop breakpoint at 1024px and up
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        roustel: ["Roustel", "cursive"],
      },
      colors: {
        gray: {
          ...colors.gray,
          25: "#FDFDFD",
        },
        primary: {
          "green-50": "#F4F5F0",
          "green-100": "#E5E9DE",
          "green-300": "#A7B893",
          "green-400": "#8FA378",
          "green-600": "#586A46",
          "green-900": "#333B2C",
        },
        secondary: {
          "earth-50": "#FCF8F0",
          "earth-100": "#F8EEDC",
          "earth-200": "#F0DAB8",
          "earth-300": "#E7C18A",
          "earth-500": "#D5863A",
          "earth-600": "#BA6025",
          "earth-900": "#6B3B23",
        },
      },
    },
  },
  plugins: [],
};
