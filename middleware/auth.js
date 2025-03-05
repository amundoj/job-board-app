const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, 'mySecretKey123'); // Hardcoded secret
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log('Token:', token);
    console.log('JWT_SECRET:', 'mySecretKey123');
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = auth;