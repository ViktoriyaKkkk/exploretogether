/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      black: '#333333',
      red: '#EB5757',
      gray: '#828282',
      'dark-gray': '#4F4F4F',
      'light-gray': '#B0B0B0',
      'dark-white': '#F2F2F2',
      'dark-green': '#40936B',
      'light-green': '#6FCF97',
    },
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

