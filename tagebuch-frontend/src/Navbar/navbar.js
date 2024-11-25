import React, { useState } from 'react';
import './navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); // State to manage menu visibility

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);                       // Toggle the menu visibility
  };

  return (
    <nav className="navbar">
      <img src="/logo.png" alt="App Logo" className="navbar-logo" />
      <div className="hamburger-menu" onClick={toggleMenu}>
        &#9776; {/* Hamburger icon */}
      </div>
      <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
        <li><a href="/">About</a></li>
        <li><a href="/journal">Journal</a></li>
        <li><a href="/history">History</a></li>
        <li><a href="/feedback">Feedback</a></li>
        <li><a href="/login">Login</a></li>
        <li><a href="/register">Registrieren</a></li>

      </ul>
    </nav>
  );
};

export default Navbar;
