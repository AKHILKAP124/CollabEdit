import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
// https://tailwindcss.com/docs/guides/vite
export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
  plugins: [tailwindcss(), react()],
});