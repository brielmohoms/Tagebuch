const mongoose = require('mongoose');
const { Schema } = mongoose;

const HistorySchema = new Schema({
  date: { type: String, required: true },
  content: { type: String, required: true },
});

// Check if the model already exists, to avoid overwriting it
const HistoryEntry = mongoose.models.HistoryEntry || mongoose.model('HistoryEntry', HistorySchema);

module.exports = HistoryEntry;