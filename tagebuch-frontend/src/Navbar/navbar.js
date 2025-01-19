// src/Navbar/navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';

const Navbar = ({ user, setUser }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    // Token entfernen und globalen User-State zurücksetzen
    localStorage.removeItem('token');
    setUser(null);
    // Clientseitige Navigation statt vollem Reload
    navigate('/login');
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
        {user ? (
          <>
            <li><Link to="/profile">Hallo, {user.name}</Link></li>
            <li>
              <button
                onClick={handleLogout}
                style={{ background: 'none', border: 'none', color: '#DA1766', fontWeight: 'bold', cursor: 'pointer' }}
              >
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
