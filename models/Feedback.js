// models/Feedback.js
const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  benutzerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bewertung: { type: Number, required: true, min: 1, max: 5 },
  kommentar: { type: String }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
