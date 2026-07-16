/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        accent: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          900: "#064e3b",
        },
        coffee: {
          50: "#fff9f1",
          100: "#f7f1ea",
          200: "#efe1d2",
          300: "#dcc0a6",
          700: "#704522",
          800: "#4b2b16",
          900: "#2a170d",
        },
        cream: "#f5efe6",
        ink: "#2a170d",
      },
      boxShadow: {
        soft: "0 18px 45px -30px rgba(17, 16, 15, 0.42)",
        lift: "0 24px 70px -42px rgba(32, 18, 11, 0.55)",
      },
    },
  },
  plugins: [],
};
