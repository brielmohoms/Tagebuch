// src/Login/login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [passwort, setPasswort] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { email, passwort };

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (res.status === 200) {
        // 1) Token speichern
        localStorage.setItem('token', data.token);

        // 2) Direkt nach Login: /me abrufen
        const meRes = await fetch('http://localhost:5000/api/auth/me', {
          headers: { Authorization: `Bearer ${data.token}` },
        });
        if (!meRes.ok) {
          alert('Fehler beim Laden der Benutzerdaten');
          return;
        }
        const meData = await meRes.json();

        // 3) Globalen State aktualisieren → Navbar aktualisiert sich automatisch
        setUser(meData);

        alert('Login erfolgreich');

        // 4) Clientseitige Navigation (keine vollständige Seite-Neu­ladung)
        navigate('/');
      } else {
        alert(data.msg || 'Anmeldung fehlgeschlagen');
      }
    } catch (err) {
      console.error(err);
      alert('Es gab ein Problem beim Anmelden');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-title">Login</h2>
        <div className="auth-field">
          <label>E-Mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="auth-field">
          <label>Passwort</label>
          <input
            type="password"
            value={passwort}
            onChange={(e) => setPasswort(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="auth-button">
          Login
        </button>
        <p className="auth-switch">
          Noch kein Konto? <Link to="/register">Jetzt registrieren!</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
