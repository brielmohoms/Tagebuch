// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Token aus Header holen
  const token = req.header('x-auth-token');

  // Kein Token vorhanden
  if (!token) {
    return res.status(401).json({ msg: 'Kein Token, Autorisierung verweigert' });
  }

  // Token verifizieren
  try {
    const decoded = jwt.verify(token, 'dein_jwt_geheimnis'); // Ersetze durch dein eigenes Geheimnis
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token ist ungültig' });
  }
};
