/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.html', './src/**/*.js'],
  content: [],
  theme: {
    extend: {
      textShadow: {
        'xl': '0 2px 5px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [
  ],
}



