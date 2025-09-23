/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        maroon: {
          50: '#f9f2f4',
          100: '#f1e0e5',
          200: '#e3bcc7',
          300: '#d295a6',
          400: '#b65a6f',
          500: '#8a1538', /* primary brand maroon */
          600: '#71122f',
          700: '#5a0e25',
          800: '#420a1b',
          900: '#2b0712',
        }
      },
      fontFamily: {
        display: ['ui-serif','Georgia','Cambria','Times New Roman','Times', 'serif'],
        body: ['ui-sans-serif','system-ui','Segoe UI','Roboto','Helvetica','Arial','Noto Sans','sans-serif']
      },
      boxShadow: {
        'soft': '0 10px 30px rgba(0,0,0,0.08)',
      }
    },
  },
  plugins: [],
}
