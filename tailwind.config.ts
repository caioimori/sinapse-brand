import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        popover: "var(--popover)",
        "popover-foreground": "var(--popover-foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        destructive: "var(--destructive)",
        "destructive-foreground": "var(--destructive-foreground)",
        success: "var(--success)",
        "success-foreground": "var(--success-foreground)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
      },
      fontFamily: {
        display: "var(--font-display)",
        sans: "var(--font-sans)",
        mono: "var(--font-mono)",
      },
      borderRadius: {
        none: "0",
        sm: "var(--radius-sm)",      // 6px
        DEFAULT: "var(--radius)",    // 10px
        md: "var(--radius-md)",      // 8px (inputs)
        lg: "var(--radius-lg)",      // 10px (buttons)
        xl: "var(--radius-xl)",      // 16px (cards)
        "2xl": "var(--radius-2xl)",  // 20px (modals)
        button: "var(--radius-button)",
        card: "var(--radius-card)",
        input: "var(--radius-input)",
        badge: "var(--radius-badge)",
      },
      spacing: {
        "0": "0",
        "1": "4px",
        "2": "8px",
        "3": "12px",
        "4": "15px",
        "5": "20px",
        "6": "30px",
        "7": "40px",
        "8": "60px",
        "9": "80px",
        "10": "90px",
        "11": "120px",
        "12": "150px",
        "13": "180px",
      },
      // SISTEMA DE EASINGS DISCIPLINADO (motion catalog §2)
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",         // ease-out-expo (default luxury)
        back: "cubic-bezier(0.34, 1.56, 0.64, 1)",       // ease-out-back (overshoot)
        swift: "cubic-bezier(0.4, 0, 0.2, 1)",           // Material standard (snappy data)
      },
      transitionDuration: {
        "0": "0ms",
        fast: "150ms",
        base: "250ms",
        slow: "400ms",
        deliberate: "600ms",
        cinematic: "800ms",
      },
      animation: {
        "fade-up": "fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in": "fadeIn 0.6s cubic-bezier(0.16,1,0.3,1) both",
        "draw-line": "drawLine 1.2s cubic-bezier(0.4,0,0.2,1) both",
        "marquee-x": "marqueeX 45s linear infinite",
        "marquee-x-reverse": "marqueeXReverse 45s linear infinite",
        "scan-y": "scanY 4s linear infinite",
        "ring-pulse": "ringPulse 2.4s cubic-bezier(0.16,1,0.3,1) infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        drawLine: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        marqueeX: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeXReverse: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        scanY: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        ringPulse: {
          "0%": { transform: "scale(0.8)", opacity: "0.6" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
