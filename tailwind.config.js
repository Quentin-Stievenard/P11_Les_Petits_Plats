module.exports = {
  mode: 'jit',
  // These paths are just examples, customize them to match your project structure
  purge: ["./*.js", "./pages/*.js", "./pages/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        144: '36rem'
      },
      height: {
        250: '25rem',
        370: '37rem'
      },
      transitionProperty: {
        'width': 'width'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
