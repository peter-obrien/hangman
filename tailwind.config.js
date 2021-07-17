module.exports = {
  purge: ['index.html', 'app.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      backgroundColor: ['active']
    },
  },
  plugins: [],
}
