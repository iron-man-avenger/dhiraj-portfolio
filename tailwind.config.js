/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ecru: {
          50: '#FAF8F5',
          100: '#F7F2EB', // primary canvas
          200: '#EFE7DC',
          300: '#E5DACB',
          400: '#D5C7B3',
        },
        charcoal: {
          DEFAULT: '#2B302C', // primary dark text & elements
          deep: '#1C201D',
          card: '#242925',
          muted: '#58615B',
          faded: '#7E8A82',
          border: '#39403B',
        },
        amber: {
          DEFAULT: '#D4A066', // signature accent bar
          light: '#E2B784',
          dark: '#B58249',
          glow: '#D4A06633',
        },
        sand: {
          DEFAULT: '#E5DDCF',
          dark: '#D3C7B5',
          light: '#F2EDE4',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        hand: ['Caveat', 'cursive'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 4px 20px -2px rgba(43, 48, 44, 0.05)',
        'elevated': '0 20px 40px -15px rgba(43, 48, 44, 0.08)',
        'glow-amber': '0 0 25px -5px rgba(212, 160, 102, 0.3)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
