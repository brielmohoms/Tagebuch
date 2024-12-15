const express = require('express');
const router = express.Router();
const History = require('../models/History');

// API Endpoints

// Get entry by date
app.get('/entries/:date', async (req, res) => {
    const { date } = req.params;
    console.log('Date parameter received from frontend:', date);

    const entry = await JournalEntry.findOne({ date });
    console.log('Entry fetched from database:', entry);

    if (!entry) {
      console.log('No entry found for date:', date);
      return res.status(404).send({ message: 'Entry not found' });
    }

    res.send(entry);
  } catch (err) {
    console.error('Error fetching journal entry:', err);
    res.status(500).send({ message: 'Error fetching journal entry' });
  }
});


// Create or update a history entry
router.post('/', async (req, res) => {
    try {
        const { date, content } = req.body;
        console.log('Received date:', req.body.date);
        console.log('Parsed date:', parsedDate);


        // Parse the date to ensure correct time zone handling
        const parsedDate = moment(date).format('YYYY-MM-DD');
        
        const journal = new JournalEntry({ date: parsedDate, content });
        await journal.save();
        res.status(201).send(journal);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
