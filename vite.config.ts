import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/weixin-md/',
  plugins: [react(), tailwindcss()],
  server: {
    port: 5801,
    host: '127.0.0.1',
  },
})
