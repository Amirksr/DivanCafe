import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#1C1613",
          soft: "#241B16",
          line: "#3A2C22",
        },
        parchment: {
          DEFAULT: "#F2E9DD",
          dim: "#D9CBB6",
        },
        paper: "#EDE4D3",
        copper: {
          DEFAULT: "#B8622C",
          bright: "#D97F42",
          dim: "#8C4A20",
        },
        gold: "#D4A24C",
        sage: {
          DEFAULT: "#788650",
          solid: "#6E7C4B",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Newsreader", "serif"],
        "display-fa": ["var(--font-display-fa)", "Vazirmatn", "serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"],
        "body-fa": ["var(--font-body-fa)", "Vazirmatn", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "ring-stamp": "radial-gradient(circle, transparent 58%, currentColor 59%, currentColor 62%, transparent 63%)",
        grain: "url('/grain.svg')",
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      keyframes: {
        steam: {
          "0%, 100%": { transform: "translateY(0) scaleX(1)", opacity: "0.35" },
          "50%": { transform: "translateY(-14px) scaleX(1.15)", opacity: "0.05" },
        },
        stampIn: {
          "0%": { transform: "scale(1.6) rotate(-8deg)", opacity: "0" },
          "60%": { transform: "scale(0.95) rotate(-8deg)", opacity: "0.9" },
          "100%": { transform: "scale(1) rotate(-8deg)", opacity: "1" },
        },
      },
      animation: {
        steam: "steam 3.2s ease-in-out infinite",
        "steam-delay": "steam 3.2s ease-in-out 1.1s infinite",
        stamp: "stampIn 0.5s cubic-bezier(0.2,0.8,0.2,1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
