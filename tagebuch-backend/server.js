const express = require('express');
<<<<<<< HEAD
const cors = require('cors');
const mongoose = require('mongoose');

// Routes
const journalRoutes = require('./routes/journal');
const feedbackRoutes = require('./routes/feedback');
const motivationalRoutes = require('./routes/motivationalMessage');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/journal', journalRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/motivation', motivationalRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/echo_journal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
=======
const connectDB = require('./db');
const cors = require('cors');

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/journal', require('./routes/journal'));
app.use('/api/history', require('./routes/history'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
>>>>>>> 4964de434bf79f0b66baa2256b60049c891a15ad
