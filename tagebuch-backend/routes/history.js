const express = require('express');
const router = express.Router();
const History = require('../models/History');

// Get history entry by date
router.get('/:date', async (req, res) => {
  try {
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

module.exports = router;