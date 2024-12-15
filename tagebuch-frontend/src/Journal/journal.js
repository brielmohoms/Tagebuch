import React, { useState, useEffect } from 'react';
import { FaMoon, FaSun, FaPlus } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import './journal.css';
import { fetchMotivationalMessage, createJournalEntry, deleteJournalEntry, fetchJournalEntries } from '../services/api';

const Journal = ({ userId }) => {
  const [penColor, setPenColor] = useState('#151515'); // Default pen color
  const [text, setText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [currentQuote, setCurrentQuote] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [entries, setEntries] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Fetch motivational message
    const fetchQuote = async () => {
      try {
        const quote = await fetchMotivationalMessage();
        setCurrentQuote(quote.content);
      } catch (error) {
        console.error('Error fetching motivational message:', error);
        setCurrentQuote('Keep going!'); // Fallback message
      }
    };

    // Fetch user's journal entries
    const fetchEntries = async () => {
      try {
        const entries = await fetchJournalEntries(userId);
        setEntries(entries);
        if (entries.length > 0) {
          setText(entries[0].content); // Load the first page content
          setPageCount(entries.length);
        } else {
          setText(''); // Start with an empty page
        }
      } catch (error) {
        console.error('Error fetching journal entries:', error);
      }
    };

    fetchQuote(); // Fetch motivational message once on page load
    fetchEntries(); // Fetch journal entries once on page load
  }, [userId]);

  const changePenColor = (color) => {
    setPenColor(color);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const addPage = async () => {
    try {
      const newPage = { benutzerId: userId, content: '' }; // Ensure userId is passed
      const savedPage = await createJournalEntry(newPage); // Call the API
      setEntries([...entries, savedPage]); // Add new page to the state
      setPageCount(pageCount + 1);
      setText(''); // Clear the text area for the new page
      setCurrentPageIndex(pageCount); // Navigate to the new page
    } catch (error) {
      console.error('Error adding page:', error);
      alert('Failed to add a new page. Please try again.');
    }
  };
  

  const deletePage = async () => {
    if (pageCount > 1 && window.confirm('Are you sure you want to delete this page?')) {
      try {
        const pageToDelete = entries[currentPageIndex];
        await deleteJournalEntry(pageToDelete._id);
        const updatedEntries = entries.filter((_, index) => index !== currentPageIndex);

        setEntries(updatedEntries);
        setPageCount(updatedEntries.length);

        // Adjust the current page index
        if (currentPageIndex > 0) {
          setCurrentPageIndex(currentPageIndex - 1);
          setText(updatedEntries[currentPageIndex - 1]?.content || '');
        } else {
          setText(updatedEntries[0]?.content || '');
        }
      } catch (error) {
        console.error('Error deleting page:', error);
        alert('Failed to delete the page. Please try again.');
      }
    } else if (pageCount === 1) {
      alert('Cannot delete the only page.');
    }
  };

  const savePage = async () => {
    setIsSaving(true);
    try {
      const currentPage = entries[currentPageIndex];
      const updatedPage = { ...currentPage, content: text };
      await createJournalEntry(updatedPage);
      alert('Page saved!');
    } catch (error) {
      console.error('Error saving page:', error);
      alert('Failed to save the page. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const goToPreviousPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
      setText(entries[currentPageIndex - 1]?.content || '');
    }
  };

  const goToNextPage = () => {
    if (currentPageIndex < entries.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
      setText(entries[currentPageIndex + 1]?.content || '');
    }
  };

  return (
    <div className={`journal-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="quote-section">
        <p className="quote">{currentQuote}</p>
      </div>
      <div className="menu">
        <input
          type="color"
          value={penColor}
          onChange={(e) => changePenColor(e.target.value)}
          className="color-picker"
        />
        <button className="menu-button dark-mode-toggle" onClick={toggleDarkMode}>
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
        <button className="menu-button add-page" onClick={addPage}>
          <FaPlus />
        </button>
        <button className="menu-button delete-page" onClick={deletePage}>
          <MdDelete />
        </button>
      </div>
      <div className="page">
        <textarea
          style={{ color: penColor }}
          value={text}
          onChange={handleTextChange}
          placeholder="Write your thoughts here..."
        />
        <div className="save-section">
          <button onClick={savePage} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Page'}
          </button>
        </div>
      </div>
      <div className="page-navigation">
        <button onClick={goToPreviousPage} disabled={currentPageIndex === 0}>
          Previous Page
        </button>
        <button onClick={goToNextPage} disabled={currentPageIndex === entries.length - 1}>
          Next Page
        </button>
      </div>
      <div className="page-count">
        <p>
          Page {currentPageIndex + 1} of {pageCount}
        </p>
      </div>
    </div>
  );
};

export default Journal;
