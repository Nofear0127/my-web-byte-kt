import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Custom domain GitHub Pages serves this site from the domain root.
export default defineConfig({
  plugins: [react()],
  base: '/',
})
