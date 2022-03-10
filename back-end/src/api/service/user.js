const md5 = require('crypto-js/md5');
const jwt = require('jsonwebtoken');
const errorMessage = require('../utils/errorMessage');
const { loginSchema, registerSchema } = require('../utils/validation');
const { User } = require('../../database/models');
const {
  BAD_REQUEST,
  BAD_REQUEST_MSG,
  CONFLICT,
  CONFLICT_EMAIL_MSG,
  NOT_FOUND,
  NOT_FOUND_MSG,
} = require('../utils/dictionary');
require('dotenv').config();

const OPTIONS = {
  expiresIn: 3600,
  algorithm: 'HS256',
};

// const SECRET = process.env.JWT_SECRET;
const SECRET = 'parangaricutirimirruaro';

const getUserLoginService = async (email, password) => {
  const { error } = loginSchema.validate({ email, password });
  if (error) throw error;
  const user = await User.findOne({ where: { email } });
  if (!user) throw errorMessage(NOT_FOUND, NOT_FOUND_MSG);
  const hashPassword = md5(password).toString();
  if (user.dataValues.password !== hashPassword) throw errorMessage(BAD_REQUEST, BAD_REQUEST_MSG);
  const { id, role } = user;
  const token = await jwt.sign({ email, id, role }, SECRET, OPTIONS);
  const userDate = {
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  };
  return userDate;
};

const registerNewUserService = async (name, email, password, role) => {
  const { error } = registerSchema.validate({ name, email, password });
  if (error) throw error;
  const userExists = await User.findOne({ where: { email } });
  if (userExists) throw errorMessage(CONFLICT, CONFLICT_EMAIL_MSG);
  const hashPassword = md5(password).toString();
  await User.create({ name, email, password: hashPassword, role });
  return {
    message: 'User created successfully',
  };
};

const getUserByEmailService = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw errorMessage(NOT_FOUND, NOT_FOUND_MSG);
  return user;
};

module.exports = {
  getUserLoginService,
  registerNewUserService,
  getUserByEmailService,
};
