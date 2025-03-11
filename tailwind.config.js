module.exports = {
  purge: ['./index.html', './styles/**/*.css'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        background: '#1e1e1e',
        text: '#ffffff',
        description: '#cccccc',
        linkedin: '#0077b5',
      },
      fontFamily: {
        ubuntu: ['Ubuntu', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
