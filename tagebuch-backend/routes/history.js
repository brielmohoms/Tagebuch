const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express App
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/historyApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Define Schema and Model
const entrySchema = new mongoose.Schema({
    date: { type: String, required: true, unique: true }, // ISO date string
    content: { type: String, required: true }
});

const Entry = mongoose.model('Entry', entrySchema);

// API Endpoints

// Get entry by date
app.get('/entries/:date', async (req, res) => {
    const { date } = req.params;
    try {
        const entry = await Entry.findOne({ date });
        if (entry) {
            res.status(200).json(entry);
        } else {
            res.status(404).json({ message: "No entry found for this date" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error fetching entry", error: err.message });
    }
});

// Save or update entry
app.post('/entries', async (req, res) => {
    const { date, content } = req.body;
    try {
        const existingEntry = await Entry.findOne({ date });
        if (existingEntry) {
            existingEntry.content = content;
            await existingEntry.save();
            res.status(200).json({ message: "Entry updated", entry: existingEntry });
        } else {
            const newEntry = new Entry({ date, content });
            await newEntry.save();
            res.status(201).json({ message: "Entry saved", entry: newEntry });
        }
    } catch (err) {
        res.status(500).json({ message: "Error saving entry", error: err.message });
    }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
