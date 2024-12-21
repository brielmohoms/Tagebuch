// src/Navbar/navbar.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState('');

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:5000/api/auth/me', {
        headers: { Authorization: 'Bearer ' + token }
      })
        .then((res) => {
          if (!res.ok) throw new Error('Fehler beim Laden des Nutzers');
          return res.json();
        })
        .then((user) => {
          if (user.name) setUserName(user.name);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserName('');
    window.location.href = '/login'; // Optional: redirect
  };

  return (
    <nav className="navbar">
      <img src="/logo.png" alt="App Logo" className="navbar-logo" />
      <div className="hamburger-menu" onClick={toggleMenu}>
        &#9776;
      </div>
      <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
        <li><Link to="/">About</Link></li>
        <li><Link to="/journal">Journal</Link></li>
        <li><Link to="/history">History</Link></li>
        <li><Link to="/feedback">Feedback</Link></li>
        {userName ? (
          <>
            <li><Link to="/profile">Hallo, {userName}</Link></li>
            <li>
              <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#DA1766', fontWeight: 'bold', cursor: 'pointer' }}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
