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
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
        "tertiary-color": "var(--tertiary-color)",
        "primary-light": "var(--primary-light)",
        "primary-dark": "var(--primary-dark)",
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
  plugins: [
    require("@tailwindcss/forms"),
    function({ addUtilities }) {
      const newUtilities = {
        ".text-white\\!": {
          color: "white !important",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
