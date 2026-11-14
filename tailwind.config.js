/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
        },
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'bento': '0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 8px 24px -4px rgba(15, 23, 42, 0.04)',
        'bento-hover': '0 4px 6px -1px rgba(15, 23, 42, 0.06), 0 12px 30px -4px rgba(15, 23, 42, 0.08)',
      }
    },
  },
  plugins: [],
}
