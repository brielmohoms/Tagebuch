// routes/history.js
const auth = require('../middleware/auth');
const express = require("express");
const router = express.Router();
const History = require("../models/History");

// 1) History-Eintrag per Datum abrufen
router.get("/:date", auth, async (req, res) => {
  const { date } = req.params;
  try {
    const entry = await History.findOne({
      userId: req.user.id,
      date,
    });

    // Falls keiner existiert, geben wir 200 + leeren Inhalt zurück
    if (!entry) {
      return res.status(200).json({ content: "" });
    }

    // Ansonsten den DB-Eintrag (inkl. content) zurückgeben
    res.status(200).json(entry);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// 2) History-Eintrag speichern/aktualisieren
router.post("/save", auth, async (req, res) => {
  const { date, content } = req.body;
  if (!date) {
    return res.status(400).json({ message: "Date is required" });
  }

  try {
    let entry = await History.findOne({ userId: req.user.id, date });
    if (entry) {
      entry.content = content;
      await entry.save();
    } else {
      entry = new History({
        userId: req.user.id,
        date,
        content,
      });
      await entry.save();
    }

    res.status(200).json({ message: "History entry saved successfully", entry });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
