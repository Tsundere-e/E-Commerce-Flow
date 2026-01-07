import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'tailwindcss/index.css' // Importa direto do pacote para evitar erro de arquivo local
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)