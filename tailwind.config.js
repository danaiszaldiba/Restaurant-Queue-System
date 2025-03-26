/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Lato', 'system-ui', 'sans-serif'],
      },
      colors: {
        versailles: {
          gold: '#C5A572',
          red: '#8B0000',
          lightGold: '#E8D5B5',
          cream: '#FFFDF9',
        },
      },
    },
  },
  plugins: [],
};