// React'ı açıkça import et (Rollup hatasını çözer)
import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// Uzantıyı kaldır (.jsx yazma, Vite kendisi bulur)
import Dashboard from './Dashboard' 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Dashboard />
  </StrictMode>,
)
