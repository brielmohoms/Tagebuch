// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ msg: 'Kein Token, Autorisierung verweigert' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ msg: 'Token-Format falsch' });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, 'dein_jwt_geheimnis');
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token ist ungültig' });
  }
};
