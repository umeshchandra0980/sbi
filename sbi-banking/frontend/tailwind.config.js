/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sbi: {
          blue: '#1a5276',
          'blue-dark': '#154360',
          'blue-light': '#2471a3',
          navy: '#0d2137',
          purple: '#6c3483',
          gold: '#d4ac0d',
          green: '#1e8449',
          red: '#c0392b',
        },
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
