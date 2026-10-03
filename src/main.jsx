import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { setupCanonicalAndSEO } from './utils/seo.js'

// Initialize technical SEO and canonical configuration
setupCanonicalAndSEO()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

