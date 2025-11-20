import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // React modülünü bulamazsa diye elle gösteriyoruz
      'react': 'react',
      'react-dom': 'react-dom',
    },
  },
})
