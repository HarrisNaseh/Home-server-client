import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import UploadContext from "./context/UploadContext"

createRoot(document.getElementById('root')!).render(

  <UploadContext>
    <App />
  </UploadContext>
)
