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

/*const entry = await JournalEntry.findOne({ date: formattedDate }).lean();
if (entry) {
    // Convert date to local time zone if necessary
    const localDate = new Date(entry.date).toLocaleDateString('en-CA');
    console.log('Local date:', localDate);
}


module.exports = connectDB;*/

const findEntryByDate = async (formattedDate) => {
  try {
    const entry = await JournalEntry.findOne({ date: formattedDate }).lean();
    if (entry) {
      // Convert date to local time zone if necessary
      const localDate = new Date(entry.date).toLocaleDateString('en-CA');
      console.log('Local date:', localDate);
    } else {
      console.log('No entry found for date:', formattedDate);
    }
    return entry;
  } catch (error) {
    console.error('Error finding entry:', error);
    throw error; // Re-throw error for further handling
  }
};

// Export the functions for use in other files
module.exports = {
  connectDB,
  findEntryByDate,
};
