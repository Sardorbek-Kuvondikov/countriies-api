/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      screens: {
        sml: "375px",
        sm: "500px",
      },
      boxShadow: {
        custom: "0px 0px 18px -4px rgba(0,0,0,0.19);",
        btn: "rgba(10, 10, 30, 0.16) 0px 2px 4px 0px, rgba(14, 30, 17, 0.20) 0px 2px 16px 0px;",
      },
      container: {
        center: true,
        padding: "1.25rem",
      },
    },
  },
  plugins: [],
};
