import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,   // <--- this is important for WSL2 or Docker
    },
    host: true,
    port: 3000,
  },
})
