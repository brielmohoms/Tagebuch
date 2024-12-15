const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/journal', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

const entry = await JournalEntry.findOne({ date: formattedDate }).lean();
if (entry) {
    // Convert date to local time zone if necessary
    const localDate = new Date(entry.date).toLocaleDateString('en-CA');
    console.log('Local date:', localDate);
}


module.exports = connectDB;
