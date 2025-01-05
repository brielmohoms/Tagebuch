// models/JournalEntry.js
const mongoose = require('mongoose');

const JournalEntrySchema = new mongoose.Schema({
  benutzerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  datum: { type: Date, required: true },
  inhalt: { type: String },
  stimmung: { type: String }
});

module.exports = mongoose.model('JournalEntry', JournalEntrySchema);
