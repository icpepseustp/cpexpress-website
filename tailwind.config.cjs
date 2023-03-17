/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                tileBg: "url('/assets/images/come-bg.png')",
            },
            container: {
                center: true,
            },
            colors: {
                primary: "#06162E",
                secondary: "#0E2C4E",
                tertiary: "#334B66",
                offwhite: "#5E85B0",
                border: "#365FFF",
            },
            fontFamily: {
                dmsans: ["DM Sans", "sans-serif"],
                josefin: ["Josefin Sans", "sans-serif"],
            },
        },
    },
    plugins: [],
};
