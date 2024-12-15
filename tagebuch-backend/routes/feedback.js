const express = require('express');
const Feedback = require('../models/Feedback');
const router = express.Router();

// Submit feedback
router.post('/', async (req, res) => {
  try {
    const { benutzerId, rating, comment, isPublic } = req.body;

    if (!rating && !comment) {
      return res.status(400).send({ error: 'Either a rating or comment is required.' });
    }

    const feedback = new Feedback({
      benutzerId,
      rating,
      comment,
      isPublic,
    });

    await feedback.save();
    res.status(201).send(feedback);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Fetch all public feedback
router.get('/public', async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ isPublic: true }).sort({ date: -1 });
    res.send(feedbacks);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
