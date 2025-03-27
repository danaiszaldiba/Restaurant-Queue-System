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
          green: '#1B4332',
          gold: '#C5A572',
          lightGreen: '#2D6A4F',
          cream: '#FFFDF9',
        },
      },
    },
  },
  plugins: [],
};