import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages 需要子路径，Vercel / 本地开发使用根路径
const base = process.env.GITHUB_ACTIONS === 'true' ? '/my-web-byte-kt/' : '/'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base,
})
