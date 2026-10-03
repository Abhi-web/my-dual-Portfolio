/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        dark: {
          950: '#05070a', // Deepest background
          900: '#090d14', // Base body background
          850: '#0e1420', // Elevated container background
          800: '#141c2c', // Card background
          750: '#1a2438', // Hover card / floating elements
          700: '#223049', // Borders & dividers
          600: '#334464', // Subdued borders
          500: '#4b5f85', // Muted text / icons
          400: '#7386a6', // Secondary text
          300: '#9cb0cf', // Light secondary text
          200: '#cbd8eb', // High contrast body text
          100: '#eaf0f9', // Near-white headings
          50: '#f8fafc',
        },
        brand: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4', // Primary accent: Precision Cyan
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
          glow: 'rgba(6, 182, 212, 0.15)',
        },
        tealAccent: {
          500: '#14b8a6',
          glow: 'rgba(20, 184, 166, 0.15)',
        },
        emeraldAccent: {
          500: '#10b981',
          glow: 'rgba(16, 185, 129, 0.15)',
        },
        blueAccent: {
          500: '#3b82f6',
          glow: 'rgba(59, 130, 246, 0.15)',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-hover': '0 12px 40px 0 rgba(6, 182, 212, 0.15)',
        'glow-sm': '0 0 15px -3px rgba(6, 182, 212, 0.25)',
        'glow-md': '0 0 25px -5px rgba(6, 182, 212, 0.35)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatRev 7s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        floatRev: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(8px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
