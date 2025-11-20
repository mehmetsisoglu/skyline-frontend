import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // KRİTİK: Dosya yollarını kesinlikle projeye göre ayarlar.
  // Bu, React uygulamasının doğru JS dosyalarını bulmasını sağlar.
  base: './', 
})
