// src/Layout/layout.js
import React from 'react';
import Navbar from '../Navbar/navbar';
import './layout.css';

const Layout = ({ children, user, setUser }) => {
  return (
    <div className="layout">
      <Navbar user={user} setUser={setUser} />
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;
