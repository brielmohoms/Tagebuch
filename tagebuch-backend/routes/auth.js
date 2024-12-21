// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Registrierungsroute
router.post('/register', async (req, res) => {
  const { name, email, passwort } = req.body;

  try {
    // Prüfen, ob der Benutzer bereits existiert
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'Benutzer existiert bereits' });
    }

    // Neues Benutzerobjekt erstellen
    user = new User({
      name,
      email,
      passwort
    });

    // Passwort hashen
    const salt = await bcrypt.genSalt(10);
    user.passwort = await bcrypt.hash(passwort, salt);

    // Benutzer speichern
    await user.save();

    // JWT erstellen
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      'dein_jwt_geheimnis', // Ersetze durch dein eigenes Geheimnis
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Serverfehler');
  }
});

// Login-Route
router.post('/login', async (req, res) => {
  const { email, passwort } = req.body;

  try {
    // Benutzer suchen
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Ungültige Anmeldedaten' });
    }

    // Passwort vergleichen
    const isMatch = await bcrypt.compare(passwort, user.passwort);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Ungültige Anmeldedaten' });
    }

    // JWT erstellen
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      'dein_jwt_geheimnis',
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Serverfehler');
  }
});

// Route um den aktuellen Benutzer zurückzugeben
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-passwort');
    if (!user) {
      return res.status(404).json({ msg: 'Benutzer nicht gefunden' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Serverfehler');
  }
});

module.exports = router;
