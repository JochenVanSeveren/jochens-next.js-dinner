/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'buff': {
          '50': '#fdf9ed',
          '100': '#f9eecc',
          '200': '#f2d98d',
          '300': '#edc45c',
          '400': '#e8af37',
          '500': '#e09020',
          '600': '#c66e19',
          '700': '#a54e18',
          '800': '#863e1a',
          '900': '#6f3418',
          '950': '#3f1909',
        },

      }
    },
  },
  plugins: [],
}