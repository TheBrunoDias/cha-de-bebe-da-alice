/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        home: "url('/images/bg.jpg')"
      }
    },
  },
  plugins: [],
}

