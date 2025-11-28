import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        lima: "#C6FF5B",
        "lima-50": "#a3d34a",
        hoodie: "#E6392D",
        carbon: "#111111",
        marino: "#0E2633",
        hielo: "#F8F9FB",
      },
      fontFamily: {
        luckiest: ["var(--font-luckiest)"],
        BOOMSTER: ["var(--font-BOOMSTER)"],
        tommy: ["var(--font-made_tommy)"],
        umberto: ["var(--font-umberto)"],
        tangosans: ["var(--font-tangosans)"],
        unageo: ["var(--font-unageo)"],
        monkeyboy: ["var(--font-monkeyboy)"]
        

      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-glow": {
          "0%, 100%": {
            opacity: "1",
            filter: "drop-shadow(0 0 10px hsl(var(--neon-glow)))",
          },
          "50%": {
            opacity: "0.8",
            filter: "drop-shadow(0 0 20px hsl(var(--neon-glow)))",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        blink: {
          "0%, 45%, 55%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 3s ease-in-out infinite",
        blink: "blink 3s ease-in-out infinite",
        "spin-slow": "spin-slow 8s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
