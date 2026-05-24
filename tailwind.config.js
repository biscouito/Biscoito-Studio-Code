module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'biscoito-dark': '#1e1e1e',
        'biscoito-darker': '#121212',
        'biscoito-bg': '#252526',
        'biscoito-border': '#3e3e42',
        'biscoito-hover': '#2d2d30',
        'biscoito-text': '#d4d4d4',
        'biscoito-text-dim': '#858585',
        'biscoito-accent': '#007acc',
        'biscoito-success': '#4ec9b0',
        'biscoito-warning': '#dcdcaa',
        'biscoito-error': '#f48771',
      },
      fontFamily: {
        mono: ['Fira Code', 'Consolas', 'Monaco', 'Courier New', 'monospace'],
        sans: ['Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
      },
      fontSize: {
        xs: '11px',
        sm: '12px',
        base: '13px',
        lg: '14px',
        xl: '16px',
        '2xl': '18px',
      },
      spacing: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'fade-in': 'fade-in 0.2s ease-out',
        'slide-in-left': 'slide-in-left 0.3s ease-out',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-in-left': {
          from: {
            transform: 'translateX(-100%)',
            opacity: '0',
          },
          to: {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
