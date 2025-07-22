/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        glassGreen: {
          400: '#4ade80', // green-400
          500: '#22d3ee', // teal-400 for gradient
          600: '#16a34a', // green-600
        },
        glassPurple: {
          400: '#a78bfa', // purple-400
          500: '#8b5cf6', // purple-500
          600: '#7c3aed', // purple-600
        },
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(74,222,128,0.4) 0%, rgba(139,92,246,0.4) 100%)',
        'glass-gradient-2': 'linear-gradient(135deg, rgba(139,92,246,0.3) 0%, rgba(34,211,238,0.3) 100%)',
      },
      boxShadow: {
        glass: '0 4px 32px 0 rgba(16, 30, 54, 0.12)',
        glassStrong: '0 8px 40px 0 rgba(16, 30, 54, 0.18)',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '16px',
        xl: '24px',
      },
      borderRadius: {
        glass: '1.5rem',
      },
      transitionProperty: {
        glass: 'background, box-shadow, border, filter',
      },
      keyframes: {
        'glass-float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'glass-bokeh': {
          '0%, 100%': { filter: 'blur(0px)' },
          '50%': { filter: 'blur(4px)' },
        },
      },
      animation: {
        'glass-float': 'glass-float 4s ease-in-out infinite',
        'glass-bokeh': 'glass-bokeh 6s ease-in-out infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}; 