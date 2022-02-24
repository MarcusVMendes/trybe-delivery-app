const md5 = require('crypto-js/md5');
const { verify } = require('jsonwebtoken');
const { registerSchema } = require('../utils/validation');
require('dotenv').config();
const { User } = require('../../database/models');
const {
  CONFLICT,
  CONFLICT_EMAIL_MSG,
  UNAUTHORIZED,
  UNAUTHORIZED_MSG_USER,
} = require('../utils/dictionary');

const userIsAdmin = (token) => {
  const { role } = verify(token, process.env.JWT_SECRET);
  if (role !== 'admin') {
    const error = { code: UNAUTHORIZED, message: UNAUTHORIZED_MSG_USER };
    throw error;
  }
  return true;
};

const createNewUserService = async (...params) => {
  const [name, email, password, role, token] = params;
  userIsAdmin(token);
  const { error } = registerSchema.validate({ name, email, password });
  if (error) throw error;
  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    const userError = { code: CONFLICT, message: CONFLICT_EMAIL_MSG };
    throw userError;
  }
  const hashPassword = md5(password).toString();
  await User.create({ name, email, password: hashPassword, role });
  return {
    message: 'User created successfully',
  };
};

module.exports = {
  createNewUserService,
};