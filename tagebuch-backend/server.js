// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routen importieren
const authRoutes = require('./routes/auth');
const journalRoutes = require('./routes/journal');
const motivationRoutes = require('./routes/motivationalMessage');
const feedbackRoutes = require('./routes/feedback');

// Routen registrieren
app.use('/api/auth', authRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/motivation', motivationRoutes);
app.use('/api/feedback', feedbackRoutes);

// Test-Route
app.get('/', (req, res) => {
  res.send('Welcome to Tagebuch API');
});

// MongoDB-Verbindung
mongoose.connect('mongodb://localhost/tagebuch', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
