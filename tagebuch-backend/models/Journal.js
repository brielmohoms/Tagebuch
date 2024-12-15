/*const mongoose = require('mongoose');
const { Schema } = mongoose;

const JournalSchema = new Schema({
  date: { type: String, required: true },
  content: { type: String, required: true },
});

// Check if the model already exists, to avoid overwriting it
const JournalEntry = mongoose.models.JournalEntry || mongoose.model('JournalEntry', JournalSchema);

module.exports = JournalEntry;*/

const mongoose = require('mongoose');

const JournalEntrySchema = new mongoose.Schema({
    date: {
        type: String, // e.g., '2024-12-13'
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true
    }
});

const JournalEntry = mongoose.model('JournalEntry', JournalEntrySchema);
module.exports = JournalEntry;
