// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout/layout';
import About from './About/about';
import Journal from './Journal/journal';
import History from './History/history';
import Feedback from './Feedback/feedback';
import Login from './Login/login';
import Register from './Login/register';
import Profile from './Profile/profile';

function App() {
  // Globaler State für den aktuell eingeloggten User
  const [user, setUser] = React.useState(null);

  // Optional: Wenn du nach einem harten Reload (F5) prüfen willst,
  // ob noch ein Token im Local Storage liegt und /me abrufen möchtest,
  // kannst du das hier machen:
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((res) => {
          if (!res.ok) throw new Error('Fehler beim Abruf der Benutzerdaten');
          return res.json();
        })
        .then((meData) => setUser(meData))
        .catch((err) => console.error(err));
    }
  }, []);

  return (
    <Router>
      {/* user und setUser an Layout übergeben */}
      <Layout user={user} setUser={setUser}>
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/history" element={<History />} />
          <Route path="/feedback" element={<Feedback />} />
          {/* Login/Registrierung erhalten setUser, um den globalen State zu aktualisieren */}
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
