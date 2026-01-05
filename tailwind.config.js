/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-black': '#050505',
        'neon-green': '#00ff41',
        'neon-red': '#ff003c',
        'terminal-gray': '#1a1a1a',
      },
      fontFamily: {
        'mono': ['"Fira Code"', 'monospace'], // Good for terminal vibe
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
