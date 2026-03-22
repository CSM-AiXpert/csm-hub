/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ocean: {
          50: '#0a1628',
          100: '#0f2139',
          200: '#162d4a',
          300: '#1e3a5f',
          400: '#2d4f7c',
          500: '#3d6aa8',
          600: '#5c8dd4',
          700: '#8bb0e0',
          800: '#b9d3ec',
          900: '#e0ecf7',
        },
        midnight: '#0a0f1a',
        cf: {
          blue: '#2E8EEA',
          'blue-light': '#5AC8FA',
          'blue-dark': '#1A5CA7',
          'blue-deep': '#1C3B8B',
          red: '#DD2C2C',
          'red-light': '#FF5757',
          'red-dark': '#A51C1C',
          glow: '#FFC25F',
          'text-hi': '#E2F4FF',
          'text-md': '#7BBFDD',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'flash-red': 'flash-red 1s ease-in-out infinite',
        'green-cycle': 'green-cycle 1.5s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 3s ease infinite',
        'hero-cycle': 'hero-cycle 10s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(46, 142, 234, 0.25)' },
          '100%': { boxShadow: '0 0 40px rgba(46, 142, 234, 0.5)' },
        },
        'flash-red': {
          '0%, 100%': { backgroundColor: '#FF0000', boxShadow: '0 0 16px #FF0000, 0 0 32px #FF0000' },
          '50%': { backgroundColor: '#AA0000', boxShadow: '0 0 8px #AA0000' },
        },
        'green-cycle': {
          '0%': { color: '#00FF44', textShadow: '0 0 10px rgba(0,255,68,0.9)' },
          '33%': { color: '#00FFCC', textShadow: '0 0 10px rgba(0,255,204,0.9)' },
          '66%': { color: '#44FF99', textShadow: '0 0 10px rgba(68,255,153,0.9)' },
          '100%': { color: '#00FF44', textShadow: '0 0 10px rgba(0,255,68,0.9)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'hero-cycle': {
          '0%': { backgroundPosition: '0% 50%' },
          '25%': { backgroundPosition: '50% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '75%': { backgroundPosition: '50% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  plugins: [],
}
