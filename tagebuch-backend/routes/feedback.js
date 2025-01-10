// routes/feedback.js
const express = require('express');
const Feedback = require('../models/Feedback');
const auth = require('../middleware/auth');
const router = express.Router();

// Feedback absenden
router.post('/', auth, async (req, res) => {
  try {
    const { rating, comment, isPublic } = req.body;

    // rating ODER comment muss mindestens existieren
    if (!rating && !comment) {
      return res
        .status(400)
        .json({ error: 'Either a rating or a comment is required.' });
    }

    const feedback = new Feedback({
      benutzerId: req.user.id,
      bewertung: rating,
      kommentar: comment,
      isPublic,
    });

    await feedback.save();
    res.status(201).json(feedback);
  } catch (error) {
    console.error("Error submitting feedback:", error.message);
    res.status(400).json({ error: error.message });
  }
});

// Öffentliche Feedbacks abrufen
router.get('/public', async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ isPublic: true }).sort({ date: -1 });
    res.json(feedbacks);
  } catch (error) {
    console.error("Error fetching public feedback:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
