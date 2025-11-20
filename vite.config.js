import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // KRİTİK DÜZELTME: Statik dosyaların yüklenmesini garanti etmek için base ayarı eklendi.
  base: './', 
})
