import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#F5F0E8",
          surface: "#FAF6F0",
          primary: "#C8A2C8",
          accent: "#A47DAB",
          text: "#2C2C2C",
          darkBg: "#1a1a1a",
          darkSurface: "#2d2d2d",
          darkPrimary: "#D4B5D4",
          darkAccent: "#B899BF",
          darkText: "#E5E5E5",
        },
      },
    },
  },
  plugins: [],
};

export default config;

