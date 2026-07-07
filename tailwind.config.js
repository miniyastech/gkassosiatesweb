/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './content-loader.js',
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark':   '#0b1526',
        'brand-dark-2': '#0f2138',
        'brand-light':  '#ffffff',
        'brand-accent': '#14b8a6',
        'brand-accent-strong': '#0d9488',
        'brand-muted':  '#64748b',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans:  ['var(--font-sans)',  'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
