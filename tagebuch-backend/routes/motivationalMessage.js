// routes/motivationalMessage.js
const express = require('express');
const MotivationalMessage = require('../models/MotivationalMessage');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const messages = await MotivationalMessage.find();

    // Wenn du KEIN 404 möchtest, nimm einen Standard-Text:
    if (messages.length === 0) {
      return res.json({ content: 'Keep going!' });
    }

    // Zufällige Nachricht picken
    const randomIndex = Math.floor(Math.random() * messages.length);
    const randomMessage = messages[randomIndex];

    // Wichtig: "inhalt" im DB-Schema => randomMessage.inhalt
    res.json({ content: randomMessage.inhalt });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
