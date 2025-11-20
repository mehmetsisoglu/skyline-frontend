import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react({
    jsxRuntime: 'classic' // <== BU SATIR ÇOK ÖNEMLİ
  })],
})
