import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css'
import App from './App.jsx'

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);
const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN || "your-auth0-domain";
const auth0ClientId = import.meta.env.VITE_AUTH0_CLIENT_ID || "your-auth0-client-id";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
      domain={auth0Domain}
      clientId={auth0ClientId}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <ConvexProvider client={convex}>
        <App />
      </ConvexProvider>
    </Auth0Provider>
  </StrictMode>,
)
