/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#050507', // Deep pitch black canvas
          900: '#0B0B0E', // Surface background
          850: '#111116', // Bento card background
          800: '#1A1A22', // Subtle borders
          700: '#2A2A36', // Hover border
          600: '#3E3E4E',
        },
        emerald: {
          400: '#34D399', // Mint highlight
          500: '#10B981', // Core brand accent
          600: '#059669', // Deep emerald
        },
        amber: {
          400: '#FBBF24',
          500: '#F59E0B',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'bento': '0 0 0 1px rgba(255, 255, 255, 0.07), 0 10px 30px -10px rgba(0, 0, 0, 0.8)',
        'bento-hover': '0 0 0 1px rgba(255, 255, 255, 0.16), 0 20px 40px -15px rgba(0, 0, 0, 0.9)',
        'glow-emerald': '0 0 25px -4px rgba(16, 185, 129, 0.25)',
      }
    },
  },
  plugins: [],
}
