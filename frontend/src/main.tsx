import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "@/components/ui/provider"
import './index.css'
import App from './App.tsx'
import { KeycloakProvider } from './keycloak/keycloakContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <KeycloakProvider>
      <Provider>
        <App />
      </Provider>
    </KeycloakProvider>
  </StrictMode>,
)
