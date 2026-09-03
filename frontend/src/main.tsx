import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GlobalStatesProvider } from './contexts/GlobalStatesProvider.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AdminStateProvider } from './contexts/AdminStateProvider.tsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <AdminStateProvider>
        <GlobalStatesProvider>
          <App />
        </GlobalStatesProvider>
      </AdminStateProvider>
    </StrictMode>,
  </QueryClientProvider>
)
