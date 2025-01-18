// src/components/Register.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = { name, email, password };

    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });

      const data = await res.json();

      if (res.status === 200) {
        localStorage.setItem('token', data.token);
        alert('Registration successful');
        // Weiterleitung oder weitere Aktionen
      } else {
        alert(data.msg || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      alert('There was a problem with the registration');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-ligh">
      <form 
      className="card p-4 shadow-lg" 
      style={{maxWidth: '500px', width: '100%', maxHeight:"1500px", height:"100%"}}
      onSubmit={handleSubmit}
      >
        <h2 className="text-center text-primary mb-4">Registration</h2>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
          id="username"
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          />
        </div>
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
          Register
        </button>
        <p className="text-center">
        Already have an account? <Link to="/login" className="text-primary fw-bold">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;