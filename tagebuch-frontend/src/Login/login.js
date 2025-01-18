// src/components/Login.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { email, password };

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
        alert('Login successful');
        // Weiterleitung oder weitere Aktionen
      } else {
        alert(data.msg || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      alert('There was a problem logging in');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-ligh">
      <form 
      className="card p-4 shadow-lg"
      style={{maxWidth: '500px', width: '100%', maxHeight:"1000px", height:"100%"}}
      onSubmit={handleSubmit}
      >
        <h2 className="text-center text-primary mb-4">Login</h2>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">E-Mail</label>
          <input
          id="email"
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
          id="password"
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100 mb-3">
          Login
        </button>
        <p className="text-center">
        Don't have an account? <Link to="/register" className="text-primary fw-bold">Register now</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
