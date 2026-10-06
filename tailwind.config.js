/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        aurora: {
          purple: '#8b5cf6',
          violet: '#7c3aed',
          cyan: '#06b6d4',
          emerald: '#10b981',
          rose: '#f43f5e',
          amber: '#f59e0b',
          blue: '#3b82f6',
        },
        neu: {
          lightBg: '#eef2f6',
          darkBg: '#0f172a',
          lightSurface: '#f8fafc',
          darkSurface: '#1e293b',
        }
      },
      boxShadow: {
        'neu-flat': '8px 8px 16px rgba(163, 177, 198, 0.4), -8px -8px 16px rgba(255, 255, 255, 0.8)',
        'neu-flat-dark': '6px 6px 14px rgba(0, 0, 0, 0.5), -6px -6px 14px rgba(30, 41, 59, 0.4)',
        'neu-pressed': 'inset 4px 4px 8px rgba(163, 177, 198, 0.4), inset -4px -4px 8px rgba(255, 255, 255, 0.8)',
        'neu-pressed-dark': 'inset 4px 4px 8px rgba(0, 0, 0, 0.6), inset -4px -4px 8px rgba(30, 41, 59, 0.4)',
        'neu-convex': '4px 4px 10px rgba(163, 177, 198, 0.35), -4px -4px 10px rgba(255, 255, 255, 0.9)',
        'neu-convex-dark': '4px 4px 10px rgba(0, 0, 0, 0.4), -4px -4px 10px rgba(30, 41, 59, 0.3)',
        'glow-cyan': '0 0 25px rgba(6, 182, 212, 0.45)',
        'glow-purple': '0 0 25px rgba(139, 92, 246, 0.45)',
        'glow-rose': '0 0 25px rgba(244, 63, 94, 0.45)',
      },
      animation: {
        'aurora-flow': 'aurora 15s ease infinite alternate',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        aurora: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%': { transform: 'translate(40px, -30px) scale(1.1)' },
          '100%': { transform: 'translate(-20px, 20px) scale(0.95)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
};
