/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: {
          1: 'hsl(var(--theme-accent-1) / <alpha-value>)',
          2: 'hsl(var(--theme-accent-2) / <alpha-value>)',
          3: 'hsl(var(--theme-accent-3) / <alpha-value>)',
        },
        fg: {
          1: 'hsl(var(--theme-fg-1) / <alpha-value>)',
          2: 'hsl(var(--theme-fg-2) / <alpha-value>)',
          3: 'hsl(var(--theme-fg-3) / <alpha-value>)',
        },
        bg: {
          1: 'hsl(var(--theme-bg-1) / <alpha-value>)',
          2: 'hsl(var(--theme-bg-2) / <alpha-value>)',
          3: 'hsl(var(--theme-bg-3) / <alpha-value>)',
        },
      },
      fontSize: {
        xs: '0.694rem',
        sm: '0.833rem',
        base: '1rem',
        md: '1.2rem',
        lg: '1.44rem',
        xl: '1.728rem',
        '2xl': '2.074rem',
        '3xl': '2.488rem',
        '4xl': '2.986rem',
      },
      borderRadius: {
        'none': '0',
        'sm': '0.3vh',
        'md': '0.8vh',
        'lg': '1.2vh',
        'xl': '1.8vh',
        'full': '999999vh',
    },


    },
  },
  plugins: [],
};
