/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
      },
      colors: {
        blueDark: '#001BB7',
        bluePrimary: '#0046FF',
        orange: '#FF8040',
        lightGrey: '#E9E9E9',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        soft: '0 4px 24px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
}