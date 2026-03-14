import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext.tsx'
import { CampaignContextProvider } from './contexts/CampainContext.tsx'


const queryClient=new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <CampaignContextProvider>
    <ThemeProvider>
         <App />
    </ThemeProvider>
    </CampaignContextProvider>
    </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
