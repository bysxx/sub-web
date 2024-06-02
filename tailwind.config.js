/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './ui/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        bottom: '0 6px 13px 0px rgba(0, 0, 0, 0.15)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: {
          b200: '#5396F1',
          d400: '#002448',
        },
        secondary: {
          b100: '#BCD8FF',
          y100: '#FFB74B',
          r100: '#FF705C',
          d100: '#ECF0F3',
          d200: '#D0DCE5',
          d300: '#596874',
          d400: '#002448',
        },
      },
      width: {
        47: '11.75rem',
        100: '25rem',
      },
      minWidth: {
        47: '11.75rem',
        100: '25rem',
      },
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require('tailwind-scrollbar-hide')],
  extend: {
    display: ['group-hover'],
  },
};
