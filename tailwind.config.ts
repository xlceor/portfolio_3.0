import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#ffffff",
        "bg-elevated": "#f9f9f9",
        surface: "#f4f4f4",
        "surface-border": "#e5e7eb",
        text: "#1a1a1a",
        muted: "#666666",
        accent: "#1e40af",
        "accent-glow": "rgba(30, 64, 175, 0.1)",
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        mono: ['"DM Mono"', 'monospace'],
        body: ['"Outfit"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
