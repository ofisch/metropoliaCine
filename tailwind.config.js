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
        tangerine: "#e67d1c",
        gunmetal: "#292F36",
        blue: "#99C7FF",
        white: "#FFFFFF",
        secondary: "#69788C",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
