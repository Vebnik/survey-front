const { heroui } = require("@heroui/theme");
import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./index.html",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/(toast|spinner).js",
  ],
  theme: {
    extend: {
      colors: {
        bismark: {
          50: "#f2f8f9",
          100: "#ddebf0",
          200: "#c0d8e1",
          300: "#94bccc",
          400: "#6198af",
          500: "#467c94",
          600: "#406c85",
          700: "#365568",
          800: "#334957",
          900: "#2e3e4b",
          950: "#1b2731",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui(), heroui()],
};
