
const db = require('./db');
const User = require('./models/User');
const JournalEntry = require('./models/JournalEntry');
const Feedback = require('./models/Feedback');
const MotivationalMessage = require('./models/MotivationalMessage');

db.once('open', async () => {
  try {
    
    const neuerBenutzer = new User({
      name: 'Max Mustermann',
      email: 'max@example.com',
      passwort: 'geheim' 
    });

    await neuerBenutzer.save();
    console.log('Benutzer gespeichert:', neuerBenutzer);

    
    const neuerEintrag = new JournalEntry({
      benutzerId: neuerBenutzer._id,
      datum: new Date(),
      inhalt: 'Heute war ein guter Tag.',
      stimmung: '😊'
    });

    await neuerEintrag.save();
    console.log('Journaleintrag gespeichert:', neuerEintrag);

    const neuesFeedback = new Feedback({
      benutzerId: neuerBenutzer._id,
      bewertung: 5,
      kommentar: 'Tolle App!'
    });

    await neuesFeedback.save();
    console.log('Feedback gespeichert:', neuesFeedback);

  
    const neueNachricht = new MotivationalMessage({
      inhalt: 'Du schaffst das!'
    });

    await neueNachricht.save();
    console.log('Motivationsnachricht gespeichert:', neueNachricht);

    
    db.close();
  } catch (error) {
    console.error('Fehler:', error);
  }
});

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

