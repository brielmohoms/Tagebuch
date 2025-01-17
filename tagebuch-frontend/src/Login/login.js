// src/components/Login.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [passwort, setPasswort] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { email, passwort };

    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      const data = await res.json();

      if (res.status === 200) {
        // Token speichern
        localStorage.setItem('token', data.token);
        alert('Login erfolgreich');
        // Weiterleitung oder weitere Aktionen
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
