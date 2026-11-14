/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        oceanic: {
          950: '#0A0F1D', // Main canvas background (Deep Navy)
          900: '#0D1527', // Sidebar background
          850: '#131C31', // Card surface background
          800: '#1B2A4A', // Elevated card surface
          700: '#23385D', // Secondary dark surface
          600: '#334E7D',
        },
        cyan: {
          300: '#67E8F9',
          400: '#22D3EE',
          500: '#06B6D4', // Primary brand accent
          600: '#0891B2',
        },
        sky: {
          300: '#7DD3FC',
          400: '#38BDF8', // Secondary accent
          500: '#0EA5E9',
        },
        amber: {
          400: '#FBBF24',
          500: '#F59E0B', // Benchmark / warning
          600: '#D97706',
        },
        danger: {
          400: '#FB7185', // Danger / skill gap
          500: '#F43F5E',
        },
        txt: {
          primary: '#F1F5F9',   // Crisp ice white
          secondary: '#94A3B8', // Slate blue-gray
          muted: '#64748B',
        }
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderColor: {
        subtle: 'rgba(56, 189, 248, 0.10)',
        elevated: 'rgba(56, 189, 248, 0.18)',
      },
      boxShadow: {
        'bento': '0 4px 20px -4px rgba(2, 6, 23, 0.6), 0 0 0 1px rgba(56, 189, 248, 0.08)',
        'bento-hover': '0 8px 30px -4px rgba(6, 182, 212, 0.15), 0 0 0 1px rgba(56, 189, 248, 0.22)',
      }
    },
  },
  plugins: [],
}
