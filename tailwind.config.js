/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#F7F7F5',
          light: '#FAFAF9',
          dark: '#EFEFEA',
        },
        ink: {
          DEFAULT: '#171717',
          pure: '#000000',
          obsidian: '#111318',
          navy: '#101B2B',
          secondary: '#777777',
          muted: '#999999',
          light: '#B8C0CC',
        },
        brand: {
          blue: '#286BFF',
          navy: '#101B2B',
          black: '#111318',
          silver: '#B8C0CC',
        },
        line: {
          DEFAULT: '#E7E7E5',
          dark: '#262626',
          subtle: 'rgba(0, 0, 0, 0.06)',
          'subtle-dark': 'rgba(255, 255, 255, 0.1)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Manrope', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.025em',
        normal: '0',
        wide: '0.04em',
        widest: '0.12em',
      },
      borderRadius: {
        'none': '0',
        'sm': '2px',
        DEFAULT: '4px',
        'md': '6px',
        'lg': '8px',
        'xl': '12px',
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(0, 0, 0, 0.04)',
        'lift': '0 10px 30px -10px rgba(0, 0, 0, 0.08)',
        'focus': '0 0 0 2px #111318',
      },
    },
  },
  plugins: [],
};
