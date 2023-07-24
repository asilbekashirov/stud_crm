/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          1000: '#ae8507',
          900: '#ffc300',
        },
        secondary: {
          800: '#a0bded',
          900: '#dadadc'
        },
        background: {
          900: '#eaebeb'
        },
        text: {
          900: '#191a1a'
        },
        accent: {
          900: '#93949a'
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
