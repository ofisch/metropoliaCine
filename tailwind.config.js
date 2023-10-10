/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}", "./node_modules/flowbite//*.js"],
  theme: {
    extend: {
      fontSize: {
        sm: "0.8rem",
        base: "1rem",
        xl: "1.25rem",
        "2xl": "1.563rem",
        "3xl": "1.953rem",
        "4xl": "2.441rem",
        "5xl": "3.052rem",
      },
      screens: {
        sm: "480px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {
        action: "#EF5D60",
        actionhover: "#EB3336",
        primary: "#292F36",
        primarydark: "#23282F",
        primarylight: "#343C46",
        event: "#59C3C3",
        secondary: "#DAD2D8",
      },
      backgroundImage: {
        testi: "url('/images/porsche992gt3.jpg')",
        democompo: "url('/images/democompo-thumbnail.png')",
        mikko: "url('/images/mikko-thumbnail.png')",
        morning: "url('/images/morning-thumbnail.png')",
        museo: "url('/images/museo-thumbnail.png')",
        opiskelija: "url('/images/opiskelija-thumbnail.png')",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
