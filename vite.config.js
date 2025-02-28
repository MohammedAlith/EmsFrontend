import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  server: {
    host: true, // Allow external access
    port: 3000, // You can keep 3000 if needed
    strictPort: true,
  },

  preview: {
    allowedHosts: ['emsfrontend-production-ae35.up.railway.app'], // Allow Railway host
  }
});
