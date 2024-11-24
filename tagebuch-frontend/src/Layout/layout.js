import React from 'react';
import Navbar from '../Navbar/navbar';
import './layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      <div className="content">
        {children} {/* This renders the page content dynamically */}
      </div>
    </div>
  );
};

export default Layout;