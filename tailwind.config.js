/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './content-loader.js',
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark':   '#0f172a',
        'brand-light':  '#ffffff',
        'brand-accent': '#2563eb',
        'brand-muted':  '#94a3b8',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans:  ['var(--font-sans)',  'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
