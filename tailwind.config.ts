import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Instrument Sans"', "sans-serif"],
      },
      colors: {
        "dialog-backdrop": "#68669933",
        white: "#ffffff",
        black: "#000000",
        gray: {
          100: "#fcfcfc",
          200: "#f9f9f9",
          300: "#f0f0f0",
          400: "#e8e8e8",
          800: "#bbbbbb",
          900: "#8d8d8d",
          1100: "#646464",
          1200: "#202020",
        },
        blue: {
          300: "#e6f4fe",
          1000: "#0588f0",
          1100: "#0d74ce",
        },
        red: {
          300: "#feebec",
          1000: "#dc3e42",
          1100: "#ce2c31",
        },
        lime: {
          100: "#ecfcca",
          700: "#497d00",
        },
        green: {
          500: "#C4E8D1",
          800: "#5BB98B",
          1100: "#218358",
        },
        orange: {
          300: "#ffefd6",
          900: "#f76b15",
          1000: "#ef5f00",
        },
        purple: {
          400: "#f2e2fc",
          1000: "#8347b9",
        },
        slate: {
          200: "#f9f9fb",
          300: "#f0f0f3",
          400: "#e8e8ec",
          600: "#d9d9e0",
          700: "#334155",
          800: "#b9bbc6",
          900: "#8b8d98",
          1000: "#80838d",
          1100: "#60646c",
          1200: "#1c2024",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
