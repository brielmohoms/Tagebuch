// src/Profile/profile.js
import React, { useEffect, useState } from 'react';

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:5000/api/auth/me', {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error('Fehler beim Abruf des Nutzers');
          return res.json();
        })
        .then((data) => setUser(data))
        .catch((err) => console.error(err));
    }
  }, []);

  if (!user) {
    return <div>Bitte einloggen!</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Hallo {user.name}!</h2>
      <p>Deine E-Mail: {user.email}</p>
    </div>
  );
}
