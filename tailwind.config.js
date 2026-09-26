/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#1e0c42',
        },
        champagne: {
          50: '#fbf9f4',
          100: '#f6f2e6',
          200: '#ece2c9',
          300: '#ddcaa1',
          400: '#caad71',
          500: '#b8924c',
          600: '#a0783b',
          700: '#805c30',
          800: '#684a2b',
          900: '#573d26',
        },
        obsidian: {
          800: '#181e2b',
          900: '#0f1420',
          950: '#090d16',
        },
        parchment: {
          50: '#fcfbfa',
          100: '#f7f4ed',
          200: '#ede6d8',
          300: '#e1d5bf',
          800: '#2b241c',
          900: '#1b1610',
        }
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'book': '0 12px 30px -8px rgba(15, 23, 42, 0.22), 0 4px 12px -2px rgba(15, 23, 42, 0.08)',
        'book-hover': '0 24px 48px -12px rgba(15, 23, 42, 0.35), 0 8px 18px -4px rgba(15, 23, 42, 0.12)',
        'gold-glow': '0 0 25px -4px rgba(184, 146, 76, 0.35)',
      },
    },
  },
  plugins: [],
}
