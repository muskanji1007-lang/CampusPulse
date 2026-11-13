/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#060B18', // Deep background
          900: '#0B132B', // Surface / Card Background
          850: '#101B3B', // Border / Hover
          800: '#1C2541', // Muted Secondary
          700: '#3A506B', // Soft text / Subdued lines
        },
        teal: {
          300: '#72EFDD',
          400: '#48CAE4', // Bright Accent
          500: '#00B4D8', // Primary Brand Color
          600: '#0096C7', // Deep Teal
          700: '#0077B6', // Dark Accent
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-teal': '0 0 25px -5px rgba(0, 180, 216, 0.25)',
        'glow-subtle': '0 4px 20px -2px rgba(11, 19, 43, 0.7)',
      }
    },
  },
  plugins: [],
}
