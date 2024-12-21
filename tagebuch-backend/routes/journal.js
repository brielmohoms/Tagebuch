// routes/journal.js
const express = require('express');
const JournalEntry = require('../models/JournalEntry');
const auth = require('../middleware/auth');

const router = express.Router();

// Neuen Tagebuch-Eintrag erstellen
router.post('/', auth, async (req, res) => {
  try {
    const benutzerId = req.user.id;
    const { datum, inhalt, stimmung } = req.body;

    const journal = new JournalEntry({
      benutzerId,
      datum: datum ? new Date(datum) : new Date(),
      inhalt,
      stimmung,
    });

    await journal.save();
    res.status(201).json(journal);
  } catch (err) {
    console.error("Error creating journal entry:", err.message);
    res.status(400).json({
      message: "Could not create journal entry",
      error: err.message,
    });
  }
});

// Alle Tagebucheinträge für den eingeloggten User holen
router.get('/', auth, async (req, res) => {
  try {
    const benutzerId = req.user.id;
    const entries = await JournalEntry.find({ benutzerId });
    res.json(entries);
  } catch (err) {
    console.error("Error fetching journal entries:", err.message);
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
});

// "Save" Route, ähnlich wie History
router.post('/save', auth, async (req, res) => {
  try {
    const benutzerId = req.user.id;
    const { date, content, stimmung } = req.body;

    const parsedDate = date ? new Date(date) : new Date();

    let entry = await JournalEntry.findOne({ benutzerId, datum: parsedDate });
    if (entry) {
      entry.inhalt = content;
      if (stimmung) entry.stimmung = stimmung;
      await entry.save();
    } else {
      entry = new JournalEntry({
        benutzerId,
        datum: parsedDate,
        inhalt: content,
        stimmung,
      });
      await entry.save();
    }

    res.status(200).json({ message: "Journal entry saved successfully", entry });
  } catch (err) {
    console.error("Error saving journal entry:", err.message);
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
});

/**
 * NEU: Delete-Route, damit "deleteJournalEntry()" aus dem Frontend funktioniert.
 * z.B.: DELETE http://localhost:5000/api/journal/1234abcd
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    // Eintrag suchen
    const entry = await JournalEntry.findById(req.params.id);
    if (!entry) {
      return res.status(404).json({ msg: 'Journal entry not found' });
    }

    // Nur der Inhaber darf löschen
    if (entry.benutzerId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await entry.remove();
    res.json({ msg: 'Journal entry deleted successfully' });
  } catch (error) {
    console.error("Error deleting journal entry:", error.message);
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

module.exports = router;
