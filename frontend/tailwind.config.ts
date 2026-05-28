import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0f172a',
        brand: '#2563eb',
        coral: '#f97316',
        mint: '#10b981'
      },
      boxShadow: {
        card: '0 18px 60px rgba(15, 23, 42, 0.14)'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};

export default config;
