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
    }
  },
  plugins: [],
}

