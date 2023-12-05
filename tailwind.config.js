/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ './pages/**/*.{js,ts,tsx}',],
  theme: {
    extend: {},
  },
  plugins: [

    require('autoprefixer'),

  ],
}

