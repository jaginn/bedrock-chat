/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      body: ['Barlow', 'sans-serif'],
    },
    extend: {
      transitionProperty: {
        width: 'width',
        height: 'height',
      },
      animation: {
        fastPulse: 'pulse 0.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      colors: {
        'aws-squid-ink': {
          light: '#447B6F',    // Brand teal/sage - primary color
          dark: '#171717',
        },
        'aws-sea-blue': {
          light: '#41505D',    // Brand dark blue-gray - secondary color
          dark: '#757575',
        },
        'aws-sea-blue-hover': {
          light: '#2E3A44',    // Darker shade for hover states
          dark: '#5b5b5b',
        },
        'aws-aqua': '#447B6F',     // Brand teal/sage
        'aws-lab': '#2E9E46',      // Brand bright green - accent color
        'aws-mist': '#94B391',     // Brand light sage - tertiary color
        'aws-font-color': {
          light: '#41505D',    // Brand dark blue-gray for text
          dark: '#cacaca',
          gray: '#909193',
          blue: '#447B6F',     // Brand teal for links/highlights
        },
        'aws-font-color-white': {
          light: '#ffffff',
          dark:'#ececec',
        },
        'aws-ui-color': {
          dark: '#151515',
        },
        'aws-paper': {
          light: '#f1f3f3',
          dark: '#212121',
        },
        red: '#dc2626',
        'light-red': '#fee2e2',
        yellow: '#f59e0b',
        'light-yellow': '#fef9c3',
        'dark-gray': '#6b7280',
        gray: '#9ca3af',
        'light-gray': '#e5e7eb',
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require('@tailwindcss/typography'), require('tailwind-scrollbar')],
};
