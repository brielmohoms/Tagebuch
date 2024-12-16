const express = require('express');
const JournalEntry = require('../models/JournalEntry');

const router = express.Router();

// Create a new journal entry
router.post('/', async (req, res) => {
  try {
    const journal = new JournalEntry(req.body);
    await journal.save();
    res.status(201).send(journal);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Fetch all journal entries
router.get('/', async (req, res) => {
  const entries = await JournalEntry.find();
  res.send(entries);
});

module.exports = router;
