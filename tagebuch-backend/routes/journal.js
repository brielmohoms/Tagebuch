const express = require('express');
const JournalEntry = require('../models/JournalEntry'); // Correctly import JournalEntry model
const router = express.Router();

// Create or add a new journal entry
router.post('/', async (req, res) => {
  try {
    const { benutzerId, content } = req.body;

    // Validate request body
    if (!benutzerId || !content) {
      return res.status(400).send({ error: 'benutzerId and content are required' });
    }

    const newEntry = new JournalEntry({
      benutzerId,
      content,
      date: new Date(),
    });

    const savedEntry = await newEntry.save();
    res.status(201).send(savedEntry); // Send back the newly created entry
  } catch (error) {
    console.error('Error creating journal entry:', error);
    res.status(500).send({ error: 'Failed to create journal entry.' });
  }
});

// Fetch all journal entries for a specific user
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch entries by user ID
    const entries = await JournalEntry.find({ benutzerId: userId }).sort({ date: -1 });

    res.status(200).send(entries);
  } catch (error) {
    console.error('Error fetching journal entries:', error);
    res.status(500).send({ error: 'Failed to fetch journal entries.' });
  }
});

// Delete a journal entry
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEntry = await JournalEntry.findByIdAndDelete(id);
    if (!deletedEntry) {
      return res.status(404).send({ error: 'Journal entry not found.' });
    }

    res.status(204).send(); // Successfully deleted
  } catch (error) {
    console.error('Error deleting journal entry:', error);
    res.status(500).send({ error: 'Failed to delete journal entry.' });
  }
});

module.exports = router;
