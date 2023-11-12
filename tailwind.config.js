const defaultColors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

const colors = {
  'tall-poppy': {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c', // Accent
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a'
  }
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],

  theme: {
    extend: {
      colors: {
        ...colors,

        primary: colors['tall-poppy'],
        secondary: defaultColors.zinc,

        accent: colors['tall-poppy'][700],
        background: defaultColors.stone[950],
        text: defaultColors.stone[100]
      },

      fontFamily: { sans: ['Montserrat', ...defaultTheme.fontFamily.sans] }
    }
  },

  plugins: []
}
