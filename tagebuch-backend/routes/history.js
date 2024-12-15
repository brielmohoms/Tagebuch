const express = require('express');
const router = express.Router();
const HistoryEntry = require('../models/History');

// Get history entry by date
router.get('/:date', async (req, res) => {
  try {
    const { date } = req.params;
    console.log('Date parameter received from frontend:', date);

    const entry = await HistoryEntry.findOne({ date });
    console.log('Entry fetched from database:', entry);

    if (!entry) {
      console.log('No entry found for date:', date);
      return res.status(404).send({ message: 'Entry not found' });
    }

    res.send(entry);
  } catch (err) {
    console.error('Error fetching history entry:', err);
    res.status(500).send({ message: 'Error fetching history entry' });
  }
});

//Create or update a history entry
router.post('/', async (req, res) => {
    try {
        const { date, content } = req.body;
        console.log('Received date:', date);
        console.log('Received content:', content);

        if (!date || !content) {
          return res.status(400).send({ message: 'Date and content are required' });
        }

        //Parse the date to ensure correct time zone
        const parsedDate = moment(date).format('YYYY-MM-DD');
        console.log('Parsed date:', parsedDate);

        const existingEntry = await HistoryEntry.findOne({ date: parsedDate });
        if (existingEntry) {
          // If entry exists, update it
          existingEntry.content = content;
          await existingEntry.save();
          console.log('Entry updated:', existingEntry);
          return res.status(200).send(existingEntry);
        }
        
        const history = new History({ date: parsedDate, content });
        await history.save();
        console.log('New entry created:', history)
        res.status(201).send(history);
    } catch (err) {
      console.error('Error saving history entry:', err);
      res.status(500).send({ message: 'Error saving history entry' });
    }
});

module.exports = router;