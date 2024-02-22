import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/**/*.svg",
  ],
  theme: {
    extend: {
    },
    keyframes: {
        slideUp: {
            "0%": { transform: "translateY(1em)", opacity: "0" },
            "100%": { transform: "translateY(0)", opacity: "100" },
        },
    },
    animation: {
        slideUp: "slideUp .5s ease-in-out",
    },

  },
  darkMode: "class",
  plugins: [require("@tailwindcss/typography")]
} satisfies Config;
