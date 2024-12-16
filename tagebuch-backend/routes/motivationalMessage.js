const express = require('express');
const MotivationalMessage = require('../models/MotivationalMessage');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // Fetch all messages
    const messages = await MotivationalMessage.find();

    if (messages.length === 0) {
      return res.status(404).send({ error: 'No motivational messages found' });
    }

    // Pick a random message
    const randomIndex = Math.floor(Math.random() * messages.length);
    const randomMessage = messages[randomIndex];

    res.send({ content: randomMessage.content });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
