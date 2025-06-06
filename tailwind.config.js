/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        orange: {
          500: '#f97316',
          600: '#ea580c',
        },
      },
      animation: {
        'spin': 'spin 1s linear infinite',
      },
      keyframes: {
        spin: {
          to: { transform: 'rotate(360deg)' },
        },
      },
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
  },
  plugins: [],
}