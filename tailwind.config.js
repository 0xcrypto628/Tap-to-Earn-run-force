/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      clipPath: {
        polygon:
          "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)", // Custom polygon shape
      },
      animation: {
        fadeouttopleft: 'fade-out-top-left 0.5s ease-out 0s 1',
        fadeouttopright: 'fade-out-top-right 0.5s ease-out 0s 1 forwards',
      },
      fontFamily: {
        'press-start': ['"Press Start 2P"',...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        'slide-in-bottom': {
          '0%': { transform: 'translateY(100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'slide-out-bottom': {
          '0%': { transform: 'translateY(0)', opacity: 1 },
          '100%': { transform: 'translateY(100%)', opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};
