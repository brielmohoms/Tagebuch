import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css";
import "./history.css";

const History = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentEntry, setCurrentEntry] = useState("");
  const [source, setSource] = useState('history');

  const formatDate = (date) => {
    const localDate = new Date(date);
    localDate.setHours(0, 0, 0, 0);
    return localDate.toISOString().split("T")[0];
  };

  const handleSourceChange = (e) => {
    setSource(e.target.value);
    fetchEntry(formatDate(selectedDate), e.target.value);
  };

  const fetchEntry = async (date, selectedSource = source) => {
    const token = localStorage.getItem("token");
    const endpoint =
      selectedSource === 'journal'
        ? `http://localhost:5000/api/journal/${date}`
        : `http://localhost:5000/api/history/${date}`;

    try {
      const response = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setCurrentEntry(data.content || "");
      } else {
        setCurrentEntry("");
      }
    } catch (error) {
      console.error("Error fetching entry:", error);
      setCurrentEntry("");
    }
  };

  const dateChange = async (date) => {
    setSelectedDate(date);
    const formattedDate = formatDate(date);
    fetchEntry(formattedDate);
  };

  const saveEntry = async () => {
    const token = localStorage.getItem("token");
    const formattedDate = formatDate(selectedDate);

    const endpoint =
      source === 'journal'
        ? "http://localhost:5000/api/journal/save"
        : "http://localhost:5000/api/history/save";

        try {
            await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ date: formattedDate, content: currentEntry }),
            });
            alert("Entry saved!");
        } catch (error) {
            console.error("Error saving entry:", error);
            alert("Error saving entry");
        }
    };

  const inputChange = (e) => {
    setCurrentEntry(e.target.value);
  };

  return (
    <div className='history-container'>
      <main className='history-content'>
        <h2 className='title'>History</h2>
        <div className='source-selection'>
          <label>Select Source:</label>
          <select value={source} onChange={handleSourceChange}>
            <option value="history">History</option>
            <option value="journal">Journal</option>
          </select>
        </div>

        <div className='history-body'>
          <section className='content-box'>
            <textarea
              value={currentEntry}
              onChange={inputChange}
              placeholder='Write something ...'
              className='textarea'
            >
            </textarea>
            <button onClick={saveEntry} className='save-button'>
              Save Entry
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
