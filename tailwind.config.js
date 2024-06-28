/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: '#2D5C4E',
        secondaryColor: '#FFFFFF',
      },
    },
  },
  plugins: [],
};
