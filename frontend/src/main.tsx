import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GlobalStatesProvider } from './contexts/GlobalStatesProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalStatesProvider>
      <App />
    </GlobalStatesProvider>
  </StrictMode>,
)
