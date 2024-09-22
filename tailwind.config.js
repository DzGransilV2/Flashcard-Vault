/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#121212",
        secondary: "#124D87",
        cardBg:"rgba(0, 31, 63, 0.5)",
        activeColor:"#3086DB",
        textColor:"#F4F0F0"
      }
    },
  },
  plugins: [],
}

