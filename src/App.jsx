import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 1. ADIM: Dashboard bileşenini içeri al
import Dashboard from './Dashboard'; 

// 2. ADIM: Sizin ORİJİNAL ANA SAYFA bileşenlerinizi içeri al
// Bu satırları kendi projenin içindeki dosya adlarıyla değiştir.
// Örneğin: import LandingPage from './LandingPage';
import HomeComponent from './[SENİN ORİJİNAL ANA SAYFA BİLEŞENİN]'; 
// Eğer başka sayfaların varsa onları da buraya import etmelisin.
// import AboutComponent from './[SENİN ORİJİNAL HAKKIMIZDA BİLEŞENİN]';

function App() {
  return (
    <Router>
      <Routes>
        {/* Orijinal Ana Sayfa Rotası (skyl.online/) */}
        <Route path="/" element={<HomeComponent />} />
        
        {/* Orijinal Diğer Sayfa Rotası (skyl.online/about) */}
        {/* Eğer varsa bu rotayı koru: <Route path="/about" element={<AboutComponent />} /> */} 

        {/* ==> YENİ: Dashboard Rotası (skyl.online/dashboard) */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Diğer tüm bilinmeyen yollar için 404 Rotası */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
