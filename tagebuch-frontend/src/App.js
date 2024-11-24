import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout/layout';
import About from './About/about';
import Journal from './Journal/journal';
import History from './History/history';
import Feedback from './Feedback/feedback';
import Login from './Login/login';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Set About as the default landing page */}
          <Route path="/" element={<About />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/history" element={<History />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
