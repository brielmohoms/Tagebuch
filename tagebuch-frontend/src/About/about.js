import React from 'react';
import { FaPen, FaShieldAlt, FaHistory, FaCommentDots, FaSun } from 'react-icons/fa'; // Import icons from react-icons
import './about.css'; // Import a CSS file for styling

const About = () => {
  // Dynamic list of items
  const features = [
    { id: 1, text: 'Here you are free to write as many pages as you like.', icon: <FaPen /> },
    { id: 2, text: 'Your privacy is taken into consideration.', icon: <FaShieldAlt /> },
    { id: 3, text: 'You can freely navigate to your past memories and journal pages with our history rubrique.', icon: <FaHistory /> },
    { id: 4, text: 'You are free to tell us what you think.', icon: <FaCommentDots /> },
    { id: 5, text: 'Every day you get a motivational sentence to boost your day and delight your thoughts before you write.', icon: <FaSun /> },
  ];

  return (
    <div className="about-page">
      <h1>Welcome to Your Best Journal App!</h1>
      <p>
        Here, you are free to write all your thoughts. We made our best effort to
        ensure you feel good. Stay comfortable because:
      </p>
      <ul className="features-list">
        {features.map((feature) => (
          <li key={feature.id} className="feature-item">
            <span className="feature-icon">{feature.icon}</span>
            <span className="feature-text">{feature.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default About;
