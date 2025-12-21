/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-indigo': '#192A51',
        'vibrant-violet': '#8A2BE2',
        'soft-off-white': '#F8F7F4',
        'dark-charcoal': '#333333',
        'medium-gray': '#A9A9A9',
      },
    },
  },
  plugins: [],
}