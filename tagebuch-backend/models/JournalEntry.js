const mongoose = require('mongoose');

const journalEntrySchema = new mongoose.Schema({
  benutzerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  content: { type: String, required: true },
});

module.exports = mongoose.model('JournalEntry', journalEntrySchema);
