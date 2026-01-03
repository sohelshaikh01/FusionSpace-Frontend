/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'soft': '0 8px 22px rgba(0, 0, 0, 0.10)',
        'soft-dark': '0 8px 22px rgba(0, 0, 0, 0.50)',
      }
    }
  },
  plugins: [],
}