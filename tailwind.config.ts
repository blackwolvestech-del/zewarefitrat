import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm near-black noir
        ink: {
          DEFAULT: "#0B0A09",
          soft: "#121110",
          800: "#1A1815",
          700: "#252220",
        },
        // Logo gold — sampled from the ZEWARE FITRAT wordmark (avg #C7AB78,
        // highlight #F3E2B4). Icons, numbers, borders, hairlines, logo mark.
        gold: {
          DEFAULT: "#C7AB78",
          light: "#E3CF9E",
          deep: "#A6884F",
          pale: "#F3E2B4",
        },
        // Vibrant yellow — high-contrast buttons, badges, banner highlights
        accent: {
          DEFAULT: "#F1C40F",
          deep: "#E6B800",
        },
        // Warm porcelain (soft white)
        pearl: {
          DEFAULT: "#F4F0E8",
          soft: "#EBE6DC",
          dim: "#DAD3C6",
        },
        // Warm greige (elegant gray)
        stone: {
          DEFAULT: "#8B8478",
          light: "#B4AE9F",
          dark: "#57534B",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
        urdu: ["var(--font-nastaliq)", "serif"],
      },
      fontSize: {
        // Fluid editorial type scale
        display: ["clamp(3.4rem, 11vw, 10rem)", { lineHeight: "0.94", letterSpacing: "-0.02em" }],
        h1: ["clamp(2.6rem, 7vw, 6rem)", { lineHeight: "0.98", letterSpacing: "-0.015em" }],
        h2: ["clamp(2.1rem, 5vw, 4rem)", { lineHeight: "1.03", letterSpacing: "-0.01em" }],
        h3: ["clamp(1.6rem, 3.2vw, 2.5rem)", { lineHeight: "1.1", letterSpacing: "-0.005em" }],
      },
      letterSpacing: {
        luxe: "0.32em",
        wide2: "0.16em",
      },
      spacing: {
        section: "clamp(5rem, 12vw, 11rem)",
      },
      maxWidth: {
        container: "1440px",
        prose2: "68ch",
      },
      backgroundImage: {
        // Logo-gold sheen — used sparingly on small accents only
        "gold-gradient":
          "linear-gradient(135deg, #A6884F 0%, #C7AB78 45%, #F3E2B4 70%, #A6884F 100%)",
        "gold-line":
          "linear-gradient(90deg, transparent, rgba(199,171,120,0.65) 50%, transparent)",
      },
      boxShadow: {
        lux: "0 30px 80px -40px rgba(0,0,0,0.7)",
        card: "0 20px 50px -30px rgba(0,0,0,0.55)",
      },
      transitionTimingFunction: {
        lux: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slow-zoom": {
          "0%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
        "line-grow": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 1s cubic-bezier(0.22,1,0.36,1) both",
        "slow-zoom": "slow-zoom 14s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
