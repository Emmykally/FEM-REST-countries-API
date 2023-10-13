/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/*.{html,js}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        nuni: ['Nunito Sans'],
      },
      colors: {
        dbe: 'hsl(209, 23%, 22%)', // Dark Blue (Dark Mode Elements)
        dbb: 'hsl(207, 26%, 17%)', // Very Dark Blue (Dark Mode Background):
        lmt: 'hsl(200, 15%, 8%)', //Very Dark Blue (Light Mode Text)
        lmi: 'hsl(0, 0%, 52%)', // Dark Gray (Light Mode Input)
        lmb: 'hsl(0, 0%, 90%)', //Very Light Gray (Light Mode Background)
        dmtlme: 'hsl(0, 0%, 100%)', // White (Dark Mode Text & Light Mode Elements)
      },
    },
  },
  plugins: [],
};
