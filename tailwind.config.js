/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#164E2E',
        'brand-accent': '#7CBE4D',
        'brand-citrus': '#F7931E',
        'brand-citrus-warm': '#FBB03B',
        'surface-light': '#F5F5F5',
        'text-main': '#222222',
        'bg-base': '#FFFFFF',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
