/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      container: {
        center: true,
      },
      colors: {
        primary: "#06162E",
        secondary: "#0E2C4E",
        tertiary: "#334B66",
        offwhite: "#5E85B0",
      },
      fontFamily: {
        dmsans: ["DM Sans", "sans-serif"]
      },
    },
  },
  plugins: [],
}
