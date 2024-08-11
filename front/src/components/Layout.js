// src/components/Layout.js
import React from 'react';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
