import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages 部署路径：网站会发布在 https://Nofear0127.github.io/my-web-byte-kt/
  base: '/my-web-byte-kt/',
})
