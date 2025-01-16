// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// import routes
const authRoutes = require('./routes/auth');
const journalRoutes = require('./routes/journal');
const historyRoutes = require('./routes/history');
const motivationRoutes = require('./routes/motivationalMessage');
const feedbackRoutes = require('./routes/feedback');

// register routes
app.use('/api/auth', authRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/motivation', motivationRoutes);
app.use('/api/feedback', feedbackRoutes);

// Serve static files (for React app)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

// test route
app.get('/', (req, res) => {
  res.send('Welcome to Tagebuch API');
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// MongoDB connection
/*mongoose.connect('mongodb://localhost/tagebuch', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});*/

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});