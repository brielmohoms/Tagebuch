import React, { useState } from 'react';
import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css";
import "./history.css";

const History = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [entries, setEntries] = useState({});
    const [currentEntry, setCurrentEntry] = useState("");


    const formatDate = (date) => {
        const localDate = new Date(date);
        localDate.setHours(0, 0, 0, 0);
        return localDate.toISOString().split("T")[0];
    };

    const dateChange = (date) => {
        setSelectedDate(date);

        const formattedDate = formatDate(date);

        if(formattedDate === formatDate(new Date())){
            setCurrentEntry(entries[formattedDate] || "");
        } else {
            setCurrentEntry(entries[formattedDate] || "");
        }
    };

    const saveEntry = () => {
        const formattedDate = formatDate(selectedDate);
        setEntries((previousEntries) => ({
            ...previousEntries,
            [formattedDate]: currentEntry,
        }));
        alert("Entry saved");
    };

    const inputChange = (e) => {
        setCurrentEntry(e.target.value);
    };

    return (
        <div className='history-container'>
            <main className='history-content'>
                <h2 className='title'>History</h2>
                <div className='history-body'>
                    <section className='content-box'>
                        <textarea value={currentEntry} 
                        onChange={inputChange}
                        placeholder='Write something ...'
                        className='textarea'>
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