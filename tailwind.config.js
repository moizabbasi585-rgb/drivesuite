/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A84C',
          light: '#D4B460',
          dark: '#A07830',
        },
        ds: {
          bg: '#0f0e0c',
          sidebar: '#0a0908',
          card: '#141210',
          border: '#2a2520',
          text: '#f5f0e8',
          muted: '#6b6055',
          soft: '#9a9088',
        }
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
