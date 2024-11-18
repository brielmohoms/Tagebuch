// app.js
const db = require('./db');
const User = require('./models/User');
const JournalEntry = require('./models/JournalEntry');
const Feedback = require('./models/Feedback');
const MotivationalMessage = require('./models/MotivationalMessage');

db.once('open', async () => {
  try {
    // Neuen Benutzer erstellen
    const neuerBenutzer = new User({
      name: 'Max Mustermann',
      email: 'max@example.com',
      passwort: 'geheim' // WICHTIG: In der Produktion Passwörter immer hashen!
    });

    await neuerBenutzer.save();
    console.log('Benutzer gespeichert:', neuerBenutzer);

    // Neuen Journaleintrag erstellen
    const neuerEintrag = new JournalEntry({
      benutzerId: neuerBenutzer._id,
      datum: new Date(),
      inhalt: 'Heute war ein guter Tag.',
      stimmung: '😊'
    });

    await neuerEintrag.save();
    console.log('Journaleintrag gespeichert:', neuerEintrag);

    // Feedback hinzufügen
    const neuesFeedback = new Feedback({
      benutzerId: neuerBenutzer._id,
      bewertung: 5,
      kommentar: 'Tolle App!'
    });

    await neuesFeedback.save();
    console.log('Feedback gespeichert:', neuesFeedback);

    // Motivationsnachricht hinzufügen
    const neueNachricht = new MotivationalMessage({
      inhalt: 'Du schaffst das!'
    });

    await neueNachricht.save();
    console.log('Motivationsnachricht gespeichert:', neueNachricht);

    // Verbindung schließen
    db.close();
  } catch (error) {
    console.error('Fehler:', error);
  }
});
