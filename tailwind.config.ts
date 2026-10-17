import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: '#1c1917',
          deep: '#0c0a09',
          elevated: '#292524',
          card: '#ffffff',
        },
        cream: {
          DEFAULT: '#fdfcf9',
          soft: '#f7f4ed',
          muted: '#ede7db',
        },
        ivory: '#1c1917',
        gold: {
          DEFAULT: '#b45309',
          soft: '#d97706',
          deep: '#78350f',
          glow: 'rgba(217, 119, 6, 0.25)',
        },
        bronze: '#78350f',
        muted: '#57534e',
        'muted-dim': '#78716c',
        surface: {
          DEFAULT: '#ffffff',
          raised: '#fcfbfa',
          sunken: '#f3ede2',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.75rem, 9vw, 7rem)', { lineHeight: '0.94', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.25rem, 6.2vw, 4.75rem)', { lineHeight: '1', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(1.75rem, 4vw, 2.9rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(1.35rem, 2.4vw, 1.85rem)', { lineHeight: '1.18', letterSpacing: '-0.015em' }],
        eyebrow: ['0.6875rem', { lineHeight: '1.2', letterSpacing: '0.26em' }],
      },
      maxWidth: {
        content: '78rem',
        prose: '44rem',
      },
      borderRadius: {
        card: '1.5rem',
        pill: '999px',
      },
      boxShadow: {
        cinematic: '0 20px 45px -15px rgba(28, 25, 23, 0.08), 0 8px 16px -8px rgba(0, 0, 0, 0.04)',
        glass: '0 20px 50px -12px rgba(28, 25, 23, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.8)',
        'glass-hover': '0 25px 60px -15px rgba(180, 83, 9, 0.14), 0 0 0 1px rgba(217, 119, 6, 0.35)',
        lift: '0 20px 40px -15px rgba(0,0,0,0.1)',
        glow: '0 20px 50px -24px rgba(217, 119, 6, 0.4)',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'grain-shift': {
          '0%, 100%': { transform: 'translate(0,0)' },
          '20%': { transform: 'translate(-3%, 2%)' },
          '40%': { transform: 'translate(2%, -3%)' },
          '60%': { transform: 'translate(-2%, -2%)' },
          '80%': { transform: 'translate(3%, 1%)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'scroll-hint': {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top', opacity: '0' },
          '40%': { transform: 'scaleY(1)', transformOrigin: 'top', opacity: '1' },
          '60%': { transform: 'scaleY(1)', transformOrigin: 'bottom', opacity: '1' },
          '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom', opacity: '0' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.75)', opacity: '0.65' },
          '100%': { transform: 'scale(1.9)', opacity: '0' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'none' },
        },
      },
      animation: {
        grain: 'grain-shift 8s steps(5) infinite',
        marquee: 'marquee 40s linear infinite',
        'scroll-hint': 'scroll-hint 2.6s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 3s ease-out infinite',
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both',
      },
    },
  },
  plugins: [],
};

export default config;