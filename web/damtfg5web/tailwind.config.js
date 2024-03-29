/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        'honeydew':'#EBFFF2',
        'light-green':'#C0FFAD',
        'customGreen':'#21F500',
        'viridian':'#1E8576',
        'night':'#000F08'
        }
    },
  },
  plugins: [],
};
