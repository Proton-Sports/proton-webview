/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "pr-primary": "rgb(37,144,235)",
        "pr-secondary": "#2468af",
        "pr-red": "",
        "pr-green": "",
      }
    },
  },
  plugins: [],
}

