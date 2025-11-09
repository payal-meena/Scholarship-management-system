import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

process.env.TAILWIND_MODE = 'build'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
})
