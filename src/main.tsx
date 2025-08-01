import './i18n';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { UserProvider } from './contexts/UserContext';
import GeoLanguageOverride from './i18n/GeoLanguageOverride';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <GeoLanguageOverride />
      <App />
    </UserProvider>
  </StrictMode>,
)
