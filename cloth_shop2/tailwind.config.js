/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    borderRadius: {
      'none': '0',
      'sm': '0.3vh',
      DEFAULT: '0.45vh',
      'md': '0.8vh',
      'lg': '1.2vh',
      'xl': '1.8vh',
      'full': '999999vh',
    },

    colors: {
      'semiblack': 'rgba(0,0,0,0.6)',
      'darkwhite': 'rgba(255,255,255,0.2)',
      'grayshade': 'rgba(167,167,167,0.6)',
      'midnight': '#2f2f3f',
      'white': '#fff'

    }
  },
  plugins: [],
}

