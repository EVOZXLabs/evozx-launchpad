/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // System font stack premium sesuai request
        sans: [
          '-apple-system', 
          'BlinkMacSystemFont', 
          '"Segoe UI"', 
          'Roboto', 
          'Helvetica', 
          'Arial', 
          'sans-serif', 
          '"Apple Color Emoji"', 
          '"Segoe UI Emoji"', 
          '"Segoe UI Symbol"'
        ],
      },
      colors: {
        // Palet Dark Mode Premium
        evoz: {
          bg: '#0B0E14',         // Hitam pekat elegan untuk background
          surface: '#151A23',    // Hitam agak terang untuk Card
          border: '#232B38',     // Outline pemisah
          blue: '#1DA1F2',       // Aksen primary
          blueHover: '#1A91DA',
          gold: '#F5C249',       // Aksen premium
          goldHover: '#DDAE41',
          text: '#F3F4F6',       // Putih tajam
          textMuted: '#9CA3AF'   // Abu-abu elegan untuk sub-teks
        }
      },
      boxShadow: {
        // Soft Neon Glow khusus tombol dan input
        'neon-blue': '0 0 15px rgba(29, 161, 242, 0.15)',
        'neon-gold': '0 0 15px rgba(245, 194, 73, 0.15)',
        'neon-blue-strong': '0 0 25px rgba(29, 161, 242, 0.3)',
      }
    },
  },
  plugins: [],
}

