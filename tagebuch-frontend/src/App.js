// src/App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout/layout';
import About from './About/about';
import Journal from './Journal/journal';
import History from './History/history';
import Feedback from './Feedback/feedback';
import Login from './Login/login';
import Register from './Login/register';
import Profile from './Profile/profile'; // NEU importiert!

function App() {
  return (
    <Router> 
      <Layout>
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/history" element={<History />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* NEU: Profil-Route */}
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
