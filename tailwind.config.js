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
        background: '#0A0A0A',
        'background-dark': '#111111',
        'background-dark-lighter': '#1A1A1A',
        foreground: '#FFFFFF',
        'text-muted': '#A3A3A3',
        accent: '#FF4D4D',
        'accent-light': '#FF6B6B',
        'accent-dark': '#E63939',
      },
    },
  },
  plugins: [],
} 