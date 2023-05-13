/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    screens:{
       sm:"576px",
       md:"768px",
       lg:"992px",
       xl:"1200px",
    },
    container:{
      center:true,
      padding:'1rem',
    },
    extend: {
      colors:{
        primary:"#65A15A",
        custom:"#14532D",
        active:"#14532D",
      },
      fontFamily:{
        "poppins":["Poppins"],
        "roboto":["Roboto"],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require("tailwindcss-animate"),
    require('tw-elements/dist/plugin'),
  ],
}
