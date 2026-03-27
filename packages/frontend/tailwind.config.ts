import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './providers/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#1E3A5F',
          secondary: '#10B981',
          accent: '#F59E0B',
        },
        chat: {
          ai: '#EFF6FF',
          user: '#ECFDF5',
          system: '#F3F4F6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'shield-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(16, 185, 129, 0)' },
          '50%': { boxShadow: '0 0 20px 4px rgba(16, 185, 129, 0.3)' },
        },
        'confirma-glow': {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '0.05' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'shield-pulse': 'shield-pulse 500ms ease-in-out',
        'confirma-glow': 'confirma-glow 300ms ease-in-out',
        shimmer: 'shimmer 1.5s infinite',
      },
    },
  },
  plugins: [],
};

export default config;
