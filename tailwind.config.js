// tailwind.config.js - Updated for 'src' directory
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // This line is the key change
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};