// routes/journal.js
const express = require('express');
const JournalEntry = require('../models/JournalEntry');
const auth = require('../middleware/auth');

const router = express.Router();

// (1) NEU: Tagebucheintrag per Datum abrufen
router.get('/:date', auth, async (req, res) => {
  try {
    const parsedDate = new Date(req.params.date);
    // Sucht einen Eintrag mit exakt diesem benutzerId + diesem Datum
    const entry = await JournalEntry.findOne({
      benutzerId: req.user.id,
      datum: parsedDate
    });

    // Wenn kein Eintrag existiert => { content: "" } zurückgeben
    return res.json(entry || { content: "" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

// (2) Neuen Tagebuch-Eintrag erstellen
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

// (3) Alle Tagebucheinträge holen
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

// (4) "Save"-Route, ähnlich wie History
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
 * (5) Delete-Route
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    const entry = await JournalEntry.findById(req.params.id);
    if (!entry) {
      return res.status(404).json({ msg: 'Journal entry not found' });
    }

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
