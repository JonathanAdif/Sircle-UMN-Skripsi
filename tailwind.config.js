/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['"Poppins"', "sans-serif"],
      },
      colors: {
        "white-sr": "#FEFEFE",
        "gray-sr": "#B8B8B8",
        "graybg-sr": "#F6F6F6",
        "black-sr": "#303030",
        "birulogo-sr": "#003D73",
        "oldgray-sr": "#808080",
      },
      dropShadow: {
        navbar: "0px 7px 30px rgba(0, 0, 0, 0.05)",
        textLogo: "0px 2.74809px 2.74809px rgba(0, 0, 0, 0.25)",
        login1: "-10px -10px 30px rgba(0, 0, 0, 0.05)",
        login2: "10px 10px 30px rgba(0, 0, 0, 0.1)",
        komponenIsi : "5px 5px 30px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
