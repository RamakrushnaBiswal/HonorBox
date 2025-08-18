import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Add the server configuration here
  server: {
    proxy: {
      // This will proxy any request starting with /api to your backend server
      '/api': {
        target: 'http://localhost:5000', // Your backend server address
        changeOrigin: true, // Recommended for virtual hosted sites
        secure: false,      // Can be set to false if your backend is not using HTTPS
      },
    },
  },
})