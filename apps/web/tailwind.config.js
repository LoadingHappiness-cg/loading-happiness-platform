/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          ocean: 'rgb(var(--brand-ocean) / <alpha-value>)',
          midnight: 'rgb(var(--brand-midnight) / <alpha-value>)',
          sky: 'rgb(var(--brand-sky) / <alpha-value>)',
          teal: 'rgb(var(--brand-teal) / <alpha-value>)',
          indigo: 'rgb(var(--brand-indigo) / <alpha-value>)',
          mint: 'rgb(var(--brand-mint) / <alpha-value>)',
          white: 'rgb(var(--brand-white) / <alpha-value>)',
        },
        primary: 'rgb(var(--brand-sky) / <alpha-value>)',
        primaryDark: 'rgb(var(--brand-ocean) / <alpha-value>)',
        accent: 'rgb(var(--brand-teal) / <alpha-value>)',
        ink: 'rgb(var(--brand-midnight) / <alpha-value>)',
        highlight: 'rgb(var(--brand-mint) / <alpha-value>)',
        surface: 'rgb(var(--brand-white) / <alpha-value>)',
      },
    },
  },
  plugins: [],
};
