/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      'dark',
      'light',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
    ]
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")]
}