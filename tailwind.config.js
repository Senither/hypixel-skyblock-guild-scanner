const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [
    './assets/js/**/*.vue',
    './public/index.html',
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', ...defaultTheme.fontFamily.sans],
      },
    },
  },

  variants: {
    opacity: ['responsive', 'hover', 'focus', 'disabled'],
    padding: ['responsive', 'hover', 'focus'],
    borderWidth: ['hover', 'focus'],
  },

  plugins: [require('@tailwindcss/ui')],
}
