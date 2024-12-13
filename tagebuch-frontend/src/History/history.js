import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import "react-calendar/dist/Calendar.css";
import "./history.css";

const History = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [entries, setEntries] = useState({});
    const [journalEntries, setJournalEntries] = useState({});
    const [currentEntry, setCurrentEntry] = useState("");
    const [view, setView] = useState('History');


    const formatDate = (date) => {
        const localDate = new Date(date);
        return localDate.toLocaleDateString('en-CA'); // Format as YYYY-MM-DD
    };

    const fetchEntry = async (date, isJournal) => {
        const formattedDate = formatDate(date);
        const endpoint = isJournal
          ? `http://localhost:5000/api/journal/${formattedDate}`
          : `http://localhost:5000/api/history/${formattedDate}`;
      
        try {
          const response = await axios.get(endpoint);
          return response.data.content; // Return the content of the entry
        } catch (error) {
          console.error("Error fetching entry:", error);
          return ''; // Return empty if no entry is found
        }
      };   
      
    useEffect(() => {
        const loadHistoryEntry = async () => {
          const content = await fetchEntry(selectedDate, false); // Explicitly fetch History entry
          setCurrentEntry(content || '');
        };
        loadHistoryEntry();
    }, [selectedDate]);
      
    const dateChange = (date) => {
        setSelectedDate(date);
        const formattedDate = formatDate(date);
        const selectedEntries = view === 'History' ? entries : journalEntries;
        setCurrentEntry(selectedEntries[formattedDate] || '');
    };

    const saveEntry = async () => {
        const formattedDate = formatDate(selectedDate);
        console.log('Selected date (local):', new Date(selectedDate).toLocaleString());
        console.log('Formatted date:', formatDate(selectedDate));

        const content = currentEntry;
        const endpoint = view === 'Journal' 
            ? 'http://localhost:5000/api/journal' 
            : 'http://localhost:5000/api/history';
    
        await axios.post(endpoint, { date: formattedDate, content });
        alert(`${view} entry saved!`);
    };

    const inputChange = (e) => {
        if (view === 'Journal') {
          alert('Cannot modify Journal entries from the History page.');
          return;
        }
        setCurrentEntry(e.target.value);
    };

    const handleViewChange = async (e) => {
        setView(e.target.value);
        const formattedDate = formatDate(selectedDate);
      
        try {
          const content = await fetchEntry(selectedDate, e.target.value === 'Journal');
          setCurrentEntry(content || '');
        } catch (error) {
          console.error('Error fetching entry for selected view:', error);
          setCurrentEntry('');
        }
    };

    return (
        <div className='history-container'>
            <main className='history-content'>
                <div className="header">
                <h2 className="title">History</h2>
                    <select className="dropdown" value={view} onChange={handleViewChange}>
                        <option value="History">History</option>
                        <option value="Journal">Journal</option>
                    </select>
                </div>

                <div className='history-body'>
                    <section className='content-box'>
                        <textarea 
                        value={currentEntry} 
                        onChange={inputChange}
                        placeholder={
                            view === 'Journal' ? 'Journal entries are view-only' : 'Write something...'
                        }
                        className='textarea'
                        readOnly={view === 'Journal'}>
                        </textarea>

                        <button onClick={saveEntry} className='save-button'
                        disabled={view === 'Journal'}>
                            Save
                        </button>
                    </section>

                    <section className='content-box'>
                        <Calendar
                            onChange={dateChange}
                            value={selectedDate}
                            className="custom-calendar"
                        />
                    </section>
                </div>
            </main>
        </div>
    );
};

export default History;