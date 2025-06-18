import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react';
import './index.css'
import App from './App.tsx'
import 'react-photo-view/dist/react-photo-view.css';

import UploadContext from "./context/UploadContext"
import { AuthProvider } from "./context/AuthContext"

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <AuthProvider>
      <UploadContext>
        <App />
      </UploadContext>
    </AuthProvider>
  </StrictMode>
)
