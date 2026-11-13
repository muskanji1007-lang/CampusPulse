/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ai: {
          950: '#07040F', // Ultra deep obsidian void
          900: '#0E091F', // Card surface background
          850: '#160E30', // Elevated panel surface
          800: '#221648', // Component border / Divider
          700: '#3B2773', // Subdued border
          600: '#6344B5', // Mid tone
        },
        brand: {
          300: '#D8B4FE', // Light lavender
          400: '#C084FC', // Bright violet accent
          500: '#A855F7', // Core AI Purple
          600: '#9333EA', // Deep Neon Violet
          700: '#7E22CE', // Dark Purple
        },
        fuchsia: {
          400: '#E879F9',
          500: '#D946EF',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-purple': '0 0 30px -5px rgba(168, 85, 247, 0.35)',
        'glow-violet': '0 0 25px -4px rgba(147, 51, 234, 0.4)',
        'glow-subtle': '0 8px 30px -4px rgba(14, 9, 31, 0.8)',
      }
    },
  },
  plugins: [],
}
