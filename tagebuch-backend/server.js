const express = require('express');
const { connectDB } = require('./db');
const cors = require('cors');

const app = express();

// Connect to the database
//connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/journal', require('./routes/journal'));
app.use('/api/history', require('./routes/history'));

// Start server
/*const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});*/

const startServer = async () => {
  try {
    // Connect to the database
    await connectDB();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1); // Exit process with failure code
  }
};

// Initialize the server
startServer();