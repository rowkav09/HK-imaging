/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#181c1b', // deep greenish black
        surface: '#232825', // dark olive
        primary: '#7bbfae', // muted teal
        accent: '#eab676', // warm sand
        text: '#f5f5f4', // off-white
        'text-muted': '#bfc9c2', // soft gray
        border: '#2d3732', // dark border
        success: '#8ec07c', // natural green
        warning: '#eab676', // sand (reuse accent)
        error: '#e57373', // muted red
        info: '#7bbfae', // reuse primary
      },
    },
  },
  plugins: [],
};
