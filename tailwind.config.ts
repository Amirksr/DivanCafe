import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Theme-swappable page roles: these read from CSS custom properties
        // that flip between the dark and light palettes in globals.css.
        ink: {
          DEFAULT: "rgb(var(--c-ink) / <alpha-value>)",
          soft: "rgb(var(--c-ink-soft) / <alpha-value>)",
          line: "rgb(var(--c-ink-line) / <alpha-value>)",
        },
        parchment: {
          DEFAULT: "rgb(var(--c-parchment) / <alpha-value>)",
          dim: "rgb(var(--c-parchment-dim) / <alpha-value>)",
        },
        // Fixed tones that never swap with the theme: the hero sits on a
        // photo with a dark scrim (always dark/light text regardless of
        // site theme), and a couple of accent panels/buttons intentionally
        // invert against the page for contrast either way.
        charcoal: {
          DEFAULT: "#1C1613",
          soft: "#241B16",
          line: "#3A2C22",
        },
        bone: {
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
        sway: {
          "0%, 100%": { transform: "rotate(-6deg)" },
          "50%": { transform: "rotate(6deg)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(4deg)" },
        },
        jiggle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-2px)" },
        },
        glint: {
          "0%, 100%": { opacity: "0.25" },
          "50%": { opacity: "0.9" },
        },
      },
      animation: {
        steam: "steam 3.2s ease-in-out infinite",
        "steam-delay": "steam 3.2s ease-in-out 1.1s infinite",
        stamp: "stampIn 0.5s cubic-bezier(0.2,0.8,0.2,1) forwards",
        sway: "sway 1.4s ease-in-out infinite",
        wiggle: "wiggle 0.5s ease-in-out infinite",
        jiggle: "jiggle 0.6s ease-in-out infinite",
        glint: "glint 1.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
