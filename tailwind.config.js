module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        body: ['Open Sans', 'sans-serif'],
        title: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#F5A04E',
        secondary: '#EE6C4D',
        black: '#293241',
        lightBlue: '#98C1D9',
        blue: '#3D5A80',
      },
    },
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active', 'disabled'],
    textColor: ['responsive', 'hover', 'focus', 'active', 'disabled'],
    opacity: ['responsive', 'hover', 'focus', 'active', 'disabled'],
  },
  plugins: [],
};
