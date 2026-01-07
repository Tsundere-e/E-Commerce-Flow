import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Esta linha permite ler o seu index.css

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Esta linha processa o @import "tailwindcss"
  ],
})