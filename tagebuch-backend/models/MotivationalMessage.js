const mongoose = require('mongoose');

const motivationalMessageSchema = new mongoose.Schema({
  content: { type: String, required: true },
});

module.exports = mongoose.model('MotivationalMessage', motivationalMessageSchema);
