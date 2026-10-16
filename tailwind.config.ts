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
        charcoal: '#101010',
        ivory: '#F7F3EB',
        gold: {
          DEFAULT: '#C8A96B',
          soft: '#E3CE9F',
          deep: '#A98A4E',
        },
        bronze: '#8B6B3F',
        muted: '#A8A39B',
        surface: {
          DEFAULT: '#161614',
          raised: '#1D1D1A',
          sunken: '#0B0B0A',
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
        cinematic: '0 40px 90px -40px rgba(0,0,0,0.95)',
        lift: '0 28px 60px -30px rgba(0,0,0,0.9)',
        glow: '0 20px 50px -24px rgba(200,169,107,0.55)',
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