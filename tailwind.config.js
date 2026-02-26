/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#059669',
          dark: '#047857',
          light: '#D1FAE5'
        },
        secondary: {
          DEFAULT: '#E879F9',
          dark: '#C026D3',
          light: '#FAE8FF'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['Cairo', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-rtl')
  ],
}
