/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "#2C7A43", // Refined, more vibrant green
        "secondary-color": "#1A4D2E", // Deeper, more sophisticated dark green
        "tertiary-color": "#A3B899", // Softer, more elegant sage green
        "primary-light": "#E8F4EA", // Very light green for backgrounds
        "primary-dark": "#0F3520", // Very dark green for text contrast
        "accent-color": "#25D366",
        "natural-light": "#F4F7ED", // Light background color
        "natural-dark": "#2C3E2D", // Very dark green for text
      },
      fontFamily: {
        sans: ["Poppins", "var(--font-geist-sans)", "Arial", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        poppins: ["Poppins", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
        heading: ["Playfair Display", "Georgia", "serif"],
      },
      ringOpacity: {
        50: "0.5",
      },
      ringColor: {
        DEFAULT: "#2C7A43",
      },
      backgroundImage: {
        "leaf-pattern": "url('/images/leaf-pattern.png')",
        "herbal-texture": "url('/images/herbal-texture.png')",
        "organic-texture": "url('/images/backgrounds/subtle-leaf-bg.svg')",
      },
      lineHeight: {
        relaxed: "1.75",
        loose: "2",
      },
      letterSpacing: {
        wider: "0.05em",
        widest: "0.1em",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")], // Re-added the @tailwindcss/forms plugin
};
