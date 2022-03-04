const jwt = require('jsonwebtoken');

require('dotenv').config();

const {
  UNAUTHORIZED,
  UNAUTHORIZED_TOKEN,
  UNAUTHORIZED_TOKEN_INVALID,
} = require('./dictionary');

const SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  try {
    const { authorization: token } = req.headers;
    if (!token) return res.status(UNAUTHORIZED).json({ message: UNAUTHORIZED_TOKEN });
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(UNAUTHORIZED).json({ message: UNAUTHORIZED_TOKEN_INVALID });
  }
};