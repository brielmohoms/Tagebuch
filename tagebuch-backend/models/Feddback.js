const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  benutzerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  isPublic: { type: Boolean, default: false }, // Whether feedback is public
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Feedback', feedbackSchema);
