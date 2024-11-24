import React from 'react';
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src="/logo.png" alt="App Logo" className="navbar-logo" />
      <ul className="navbar-links">
        <li><a href="/">About</a></li>
        <li><a href="/journal">Journal</a></li>
        <li><a href="/history">History</a></li>
        <li><a href="/feedback">Feedback</a></li>
        <li><a href="/login">Login</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
