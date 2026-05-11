import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { 950: "#06060a", 900: "#0a0a12", 800: "#101019", 700: "#1a1a26" },
        flame: {
          50: "#fff4ed",
          100: "#ffe6d4",
          200: "#ffc8a8",
          300: "#ffa172",
          400: "#ff7a3a",
          500: "#ff5410",
          600: "#f03b06",
          700: "#c72b07",
          800: "#9c240e",
          900: "#7e2110",
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', "Impact", "system-ui", "sans-serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      animation: {
        "gradient-x": "gradient-x 12s ease infinite",
        flicker: "flicker 2.6s linear infinite",
        ride: "ride 22s linear infinite",
      },
      keyframes: {
        "gradient-x": {
          "0%,100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        flicker: {
          "0%,100%": { opacity: "1" },
          "45%": { opacity: ".85" },
          "55%": { opacity: ".95" },
        },
        ride: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
