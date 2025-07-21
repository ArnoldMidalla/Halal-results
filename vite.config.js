import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})

// tailwind.config.js
// module.exports = {
//   darkMode: 'media', // or 'class'
//   content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };
