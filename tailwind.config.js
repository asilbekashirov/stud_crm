/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          1000: '#171b21',
          900: '#151e27',
          800: '#2c3e50',
          700: 'rgb(145, 158, 171)'
        },
        secondary: {
          800: 'rgb(253, 169, 45)',
          700: 'rgb(254, 214, 128)',
          600: 'rgba(253, 169, 45, 0.08)'
        },
        text: {
          900: '#ffffff'
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
