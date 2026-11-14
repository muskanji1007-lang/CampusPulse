/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#0B0F0E', // Main background
          900: '#101613', // Sidebar background
          850: '#151C19', // Card background
          800: '#1D3028', // Elevated card surface
          700: '#263B32', // Secondary dark surface
          600: '#344D42',
        },
        emerald: {
          300: '#6EE7B7', // Secondary accent
          400: '#34D399',
          500: '#10B981', // Primary accent
          600: '#059669',
        },
        amber: {
          400: '#FBBF24',
          500: '#F59E0B', // Benchmark / warning
          600: '#D97706',
        },
        danger: {
          400: '#F87171', // Danger / skill gap
          500: '#EF4444',
        },
        txt: {
          primary: '#E8EDE9',   // Primary text
          secondary: '#9CA9A1', // Secondary text
          muted: '#6E7D75',
        }
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderColor: {
        subtle: 'rgba(255, 255, 255, 0.08)',
        elevated: 'rgba(255, 255, 255, 0.12)',
      },
      boxShadow: {
        'bento': '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px -1px rgba(0, 0, 0, 0.4)',
        'bento-elevated': '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}
