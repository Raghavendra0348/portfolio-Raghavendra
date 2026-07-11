/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--dock-primary)",
          foreground: "var(--dock-primary-fg)",
        },
        secondary: {
          DEFAULT: "var(--dock-secondary)",
          foreground: "var(--dock-secondary-fg)",
        },
      },
    },
  },
  plugins: [],
}
