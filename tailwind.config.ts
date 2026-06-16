import type { Config } from "tailwindcss";

/**
 * Single dark theme. One accent (electric blue), with acid green reserved
 * strictly for active / highlight states. Tokens mirror the CSS variables in
 * globals.css so colors stay consistent across the whole page.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#050507",
        surface: "#0D0D12",
        // a touch lighter than surface, for nested elevation
        "surface-2": "#13131A",
        line: "#1A1A24",
        ink: "#E8E8F0",
        muted: "#8A8A99",
        accent: {
          DEFAULT: "#0066FF",
          bright: "#00AAFF",
          green: "#00FF41",
        },
      },
      fontFamily: {
        // wired to next/font CSS variables set in layout.tsx
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      // one radius scale, applied by element size: tag -> button -> card
      borderRadius: {
        tag: "6px",
        btn: "12px",
        card: "16px",
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      maxWidth: {
        shell: "1180px",
      },
      boxShadow: {
        // restrained neon: tinted, soft, never a hard ring
        "glow-blue": "0 0 0 1px rgba(0,102,255,0.30), 0 14px 50px -12px rgba(0,102,255,0.45)",
        "glow-blue-sm": "0 8px 30px -10px rgba(0,102,255,0.40)",
        "glow-green": "0 0 0 1px rgba(0,255,65,0.28), 0 14px 50px -14px rgba(0,255,65,0.35)",
        "card-rest": "0 1px 0 0 rgba(255,255,255,0.02) inset, 0 18px 40px -24px rgba(0,0,0,0.9)",
      },
      keyframes: {
        // hero aurora: slow organic drift, transform + opacity only
        aurora: {
          "0%,100%": {
            transform: "translate3d(-6%, -4%, 0) scale(1)",
          },
          "33%": {
            transform: "translate3d(8%, 6%, 0) scale(1.18)",
          },
          "66%": {
            transform: "translate3d(-4%, 10%, 0) scale(0.92)",
          },
        },
        // subtle hue cycle between blue and green for the aurora
        auroraHue: {
          "0%,100%": { filter: "blur(70px) hue-rotate(0deg)" },
          "50%": { filter: "blur(70px) hue-rotate(40deg)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        aurora: "aurora 22s ease-in-out infinite",
        "aurora-hue": "auroraHue 16s ease-in-out infinite",
        shimmer: "shimmer 2.2s ease-in-out infinite",
        marquee: "marquee 34s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
