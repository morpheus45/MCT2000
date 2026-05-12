import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Charcoal/ink — base background
        ink: { 950: "#06060a", 900: "#0a0a12", 800: "#101019", 700: "#1a1a26" },
        // Flame — primary accent (kept from the original brand)
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
        // Bone/cream — editorial paper background tone
        bone: {
          50: "#fbf7ee",
          100: "#f5eedb",
          200: "#ebdfba",
          300: "#dbc78c",
          400: "#c4a45a",
        },
        // Deep blood-red — secondary accent for patches and editorial
        blood: {
          400: "#c92a2a",
          500: "#a31619",
          600: "#8c1c14",
          700: "#6c160f",
          800: "#4a0f0a",
        },
        // Asphalt — middle gray
        asphalt: { 200: "#a8a8a8", 400: "#5e5e64", 600: "#363640", 800: "#1e1e25" },
      },
      fontFamily: {
        display: ['"Bebas Neue"', "Impact", "system-ui", "sans-serif"],
        editorial: ['"DM Serif Display"', '"Playfair Display"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      letterSpacing: {
        wider2: "0.18em",
        widest2: "0.32em",
      },
      animation: {
        "gradient-x": "gradient-x 12s ease infinite",
        flicker: "flicker 2.6s linear infinite",
        ride: "ride 22s linear infinite",
        "spin-slow": "spin 14s linear infinite",
        "spin-reverse": "spin 22s linear infinite reverse",
        "wobble": "wobble 5s ease-in-out infinite",
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
        wobble: {
          "0%,100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
