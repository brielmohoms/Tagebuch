// src/Journal/Journal.js
import React, { useState } from 'react';
import { FaMoon, FaSun, FaPlus } from 'react-icons/fa';  // Import icons for dark mode and add page
import { MdDelete } from 'react-icons/md';  // Import delete icon
import './journal.css';  // Update this file for the new styles

const quotes = [
  "Believe in yourself and all that you are.",
  "The only way to do great work is to love what you do.",
  "Success is not the key to happiness. Happiness is the key to success.",
  "Don't watch the clock; do what it does. Keep going."
];

const Journal = () => {
  const [penColor, setPenColor] = useState('#151515'); // Default to Cod Gray
  const [text, setText] = useState('');
  const [pageCount, setPageCount] = useState(1);
  const [currentQuote, setCurrentQuote] = useState(
    quotes[Math.floor(Math.random() * quotes.length)]
  );
  const [isDarkMode, setIsDarkMode] = useState(false); // For dark mode

  const changePenColor = (color) => {
    setPenColor(color);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const addPage = () => {
    setPageCount(pageCount + 1);
    setText('');
  };

  const deletePage = () => {
    if (pageCount > 1) {
      setPageCount(pageCount - 1);
      setText('');
    }
  };

  const savePage = () => {
    alert('Page saved!');
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`journal-container ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* Motivational quote */}
      <div className="quote-section">
        <p className="quote">{currentQuote}</p>
      </div>

      {/* Menu (horizontal under navbar, thinner, right-aligned) */}
      <div className="menu">
        <button
          className="menu-button"
          style={{ backgroundColor: '#FBD4D8' }}
          onClick={() => changePenColor('#FBD4D8')}  // Cinderella color for the pen
        />
        <button
          className="menu-button"
          style={{ backgroundColor: '#DA1766' }}
          onClick={() => changePenColor('#DA1766')}  // Razzmatazz color for the pen
        />
        <button
          className="menu-button"
          style={{ backgroundColor: '#151515' }}
          onClick={() => changePenColor('#151515')}  // Cod Gray for the pen
        />
        <button
          className="menu-button dark-mode-toggle"
          onClick={toggleDarkMode}
        >
          {isDarkMode ? <FaSun /> : <FaMoon />} {/* Dark mode icon */}
        </button>
        <button
          className="menu-button add-page"
          onClick={addPage}
        >
          <FaPlus /> {/* Add page icon */}
        </button>
        <button
          className="menu-button delete-page"
          onClick={deletePage}
        >
          <MdDelete /> {/* Delete page icon */}
        </button>
      </div>

      {/* Journal page content */}
      <div className="page">
        <textarea
          style={{ color: penColor }}
          value={text}
          onChange={handleTextChange}
          placeholder="Write your thoughts here..."
        />
        <div className="save-section">
          <button onClick={savePage}>Save Page</button>
        </div>
      </div>

      {/* Page counter */}
      <div className="page-count">
        <p>Page {pageCount}</p>
      </div>
    </div>
  );
};

export default Journal;
