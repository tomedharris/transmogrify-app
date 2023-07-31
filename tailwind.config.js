/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tmog-light': {
          'primary': '#006AAA',
          'secondary': '#3787B9',
          'accent': '#09B89D',
          'text': '#003b5d'
        },
        'tmog-dark': {
          'primary': '#211e1e',
          'secondary': '#3f3939',
          'accent': '#863838',
          'text': '#ffffff'
        }
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}

