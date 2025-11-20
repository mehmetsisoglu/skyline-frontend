import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// ==> YENİ: Dashboard'u normal adıyla içeri al
import Dashboard from './Dashboard'; 

// ==> ORİJİNAL ANA SAYFA: Lütfen bu satırı kendi dosyanın adıyla düzelt
// ÖRNEK: Eğer ana sayfanın kodu Home.jsx ise: import HomeComponent from './Home';
import HomeComponent from './Home'; // <-- Bu satırı projenin orijinal ana sayfa bileşeninin adıyla değiştirin.
// Örnek diğer sayfa bileşenini de buraya eklemeyi unutmayın
// import AboutComponent from './About'; 


function App() {
  return (
    <Router>
      <Routes>
        {/* Ana Sayfanızın Rotası */}
        <Route path="/" element={<HomeComponent />} />
        
        {/* Dashboard Rotası */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Diğer Rotanız */}
        {/* <Route path="/about" element={<AboutComponent />} /> */}
        
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
