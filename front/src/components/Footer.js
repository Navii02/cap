// src/components/Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2024 College of Engineering Poonjar. All rights reserved.</p>
        <p>Designed by <span className="highlight">Naveen Shaji</span> and <span className="highlight">Bettina K.Peter</span></p>
        <p>Maintained by the <span className="highlight">Computer Science and Engineering Department</span></p>
      
      </div>
    </footer>
  );
};

export default Footer;
