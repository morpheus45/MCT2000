import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Charcoal/ink — base background
        ink: { 950: "#06060a", 900: "#0a0a12", 800: "#101019", 700: "#1a1a26" },
        // Midnight — deep blue night-ride palette
        midnight: {
          50: "#e6ebf6",
          200: "#7d8ab0",
          400: "#3b4a72",
          500: "#1f2a4c",
          600: "#141d3a",
          700: "#0c142a",
          800: "#080f1f",
          900: "#040814",
        },
        // Flame — primary accent
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
        // Brass — warm gold accent
        brass: {
          200: "#f2d99a",
          400: "#d2a256",
          500: "#b8852e",
          600: "#946614",
        },
        // Bone/cream
        bone: {
          50: "#fbf7ee",
          100: "#f5eedb",
          200: "#ebdfba",
          300: "#dbc78c",
          400: "#c4a45a",
        },
        // Deep blood-red
        blood: {
          400: "#c92a2a",
          500: "#a31619",
          600: "#8c1c14",
          700: "#6c160f",
          800: "#4a0f0a",
        },
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
        ride: "ride 28s linear infinite",
        "spin-slow": "spin 14s linear infinite",
        "spin-slower": "spin 30s linear infinite",
        "spin-reverse": "spin 22s linear infinite reverse",
        wobble: "wobble 5s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
        "rise": "rise 1.2s cubic-bezier(0.22, 1, 0.36, 1) both",
        "draw-line": "draw-line 1.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        "engine-rev": "engine-rev 1.4s cubic-bezier(0.5, 0, 0.2, 1) both",
        "shutter-out": "shutter-out 1.1s cubic-bezier(0.65, 0, 0.35, 1) both 0.6s",
        "pulse-flame": "pulse-flame 3s ease-in-out infinite",
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
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        rise: {
          from: { opacity: "0", transform: "translateY(120%) skewY(8deg)" },
          to: { opacity: "1", transform: "translateY(0) skewY(0)" },
        },
        "draw-line": {
          from: { "stroke-dashoffset": "300" },
          to: { "stroke-dashoffset": "0" },
        },
        "engine-rev": {
          "0%": { transform: "scale(0.6)", opacity: "0", filter: "blur(20px)" },
          "60%": { transform: "scale(1.05)", opacity: "1", filter: "blur(0)" },
          "100%": { transform: "scale(1)", opacity: "1", filter: "blur(0)" },
        },
        "shutter-out": {
          "0%": { transform: "scaleY(1)" },
          "100%": { transform: "scaleY(0)" },
        },
        "pulse-flame": {
          "0%,100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.04)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
