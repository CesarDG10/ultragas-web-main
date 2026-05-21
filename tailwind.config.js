/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './packages/orsan-maps-vue/src/**/*.{vue,js}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red:    '#E31C23',
          dark:   '#1D1D1B',
          purple: '#8434E1',
          blue:   '#2573D9',
          gray:   '#333333',
          light:  '#F4F4F4',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial':  'radial-gradient(var(--tw-gradient-stops))',
        'brand-gradient':   'linear-gradient(135deg, #2573D9 0%, #8434E1 100%)',
      },
      animation: {
        'float':       'float 6s ease-in-out infinite',
        'pulse-slow':  'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow':   'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
