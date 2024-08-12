// src/App.js
import React from 'react';
import Routes from './Routes';
import Footer from './components/Footer';
import './App.css'; // Make sure global styles are included

function App() {
  return (
    <div id="root">
      <div className="main-content">
        <Routes />
      </div>
      <Footer />
    </div>
  );
}

export default App;
