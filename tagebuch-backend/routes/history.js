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
        console.log('Received date:', req.body.date);
        console.log('Parsed date:', parsedDate);

        //Parse the date to ensure correct time zone
        const parsedDate = moment(date).format('YYYY-MM-DD');
        
        const history = new History({ date: parsedDate, content });
        await history.save();
        res.status(201).send(history);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;