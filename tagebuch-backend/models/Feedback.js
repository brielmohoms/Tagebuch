// models/Feedback.js
const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  benutzerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bewertung: { type: Number, required: true, min: 1, max: 5 }, // min=1 statt 0
  kommentar: { type: String },
  isPublic: { type: Boolean, default: false },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
