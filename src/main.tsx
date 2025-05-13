import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'react-photo-view/dist/react-photo-view.css';

import UploadContext from "./context/UploadContext"

createRoot(document.getElementById('root')!).render(

  <UploadContext>
    <App />
  </UploadContext>
)
