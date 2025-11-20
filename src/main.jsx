// src/main.jsx (FINAL CONFIGURATION)
import React from 'react';
import ReactDOM from 'react-dom/client';
import Dashboard from './Dashboard'; // Sadece Dashboard'u çağır

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Dashboard /> 
  </React.StrictMode>,
);
