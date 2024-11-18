const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/echo_journal'; // Ihre MongoDB-URI

mongoose.connect(uri)
  .then(() => console.log('Verbunden mit der Datenbank'))
  .catch(err => console.error('Verbindungsfehler:', err));

module.exports = mongoose.connection;
