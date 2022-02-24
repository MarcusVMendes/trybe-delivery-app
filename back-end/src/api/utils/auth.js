const jwt = require('jsonwebtoken');

require('dotenv').config();

const {
  UNAUTHORIZED,
  UNAUTHORIZED_TOKEN,
  UNAUTHORIZED_TOKEN_INVALID,
} = require('./dictionary');

const SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(UNAUTHORIZED).json({ message: UNAUTHORIZED_TOKEN });
  
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded.dataValues;

    next();
  } catch (e) {
    return res.status(UNAUTHORIZED).json({ message: UNAUTHORIZED_TOKEN_INVALID });
  }
};