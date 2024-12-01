// models/MotivationalMessage.js
const mongoose = require('mongoose');

const MotivationalMessageSchema = new mongoose.Schema({
  inhalt: { type: String, required: true }
});

module.exports = mongoose.model('MotivationalMessage', MotivationalMessageSchema);
