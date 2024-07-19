/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  extend: {
    backgroundImage: {
      'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      'gradient-conic': 'conic-gradient(from 180deg, var(--tw-gradient-stops))',
    },
    colors: {
      'card-bg-1': '#f9f9f9', // Warna latar belakang card pertama
      'card-bg-2': '#e0f7fa', // Warna latar belakang card kedua
      'card-bg-3': '#fff3e0', // Warna latar belakang card ketiga
      // Tambahkan lebih banyak warna sesuai kebutuhan
    },
  },

  plugins: [
    require('daisyui'),
  ],
}
