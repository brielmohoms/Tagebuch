// src/Login/register.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './register.css';

const Register = ({ setUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [passwort, setPasswort] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = { name, email, passwort };

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();

      if (res.status === 200) {
        // 1) Token speichern
        localStorage.setItem('token', data.token);

        // 2) Gleich /me abrufen
        const meRes = await fetch('http://localhost:5000/api/auth/me', {
          headers: { Authorization: `Bearer ${data.token}` },
        });
        if (!meRes.ok) {
          alert('Fehler beim Abruf der Benutzerdaten');
          return;
        }
        const meData = await meRes.json();

        // 3) Globalen State setzen → Navbar wird aktualisiert
        setUser(meData);

        alert('Registrierung erfolgreich');
        // 4) Navigieren zur Startseite oder Profil
        navigate('/');
      } else {
        alert(data.msg || 'Registrierung fehlgeschlagen');
      }
    } catch (err) {
      console.error(err);
      alert('Es gab ein Problem bei der Registrierung');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-title">Registrierung</h2>
        <div className="auth-field">
          <label>Benutzername</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
          Registrieren
        </button>
        <p className="auth-switch">
          Bereits ein Konto? <Link to="/login">Hier einloggen</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
