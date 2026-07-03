import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A0A0A",
          soft: "#111111",
          800: "#1A1A1A",
          700: "#242424",
        },
        gold: {
          DEFAULT: "#C9A24B",
          light: "#E8C874",
          deep: "#A8842F",
          pale: "#F1E5C6",
        },
        pearl: "#F7F5F1",
        stone: {
          DEFAULT: "#8A8578",
          light: "#B8B2A6",
          dark: "#5A564E",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        urdu: ["var(--font-nastaliq)", "serif"],
      },
      letterSpacing: {
        luxe: "0.22em",
        wide2: "0.14em",
      },
      maxWidth: {
        container: "1400px",
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(120deg, #A8842F 0%, #E8C874 42%, #C9A24B 60%, #F1E5C6 78%, #A8842F 100%)",
        "gold-line":
          "linear-gradient(90deg, transparent, #C9A24B 20%, #E8C874 50%, #C9A24B 80%, transparent)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slow-zoom": {
          "0%": { transform: "scale(1.08)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        shimmer: "shimmer 6s linear infinite",
        "fade-up": "fade-up 0.9s cubic-bezier(0.22,1,0.36,1) both",
        "slow-zoom": "slow-zoom 12s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
