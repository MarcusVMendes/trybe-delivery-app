const md5 = require('crypto-js/md5');
const jwt = require('jsonwebtoken');
const { loginSchema, registerSchema } = require('../utils/validation');
const { User } = require('../../database/models');
const {
  BAD_REQUEST,
  BAD_REQUEST_MSG,
  CONFLICT,
  CONFLICT_EMAIL_MSG,
} = require('../utils/dictionary');
require('dotenv').config();

const OPTIONS = {
  expiresIn: 3600,
  algorithm: 'HS256',
};

const getUserLoginService = async (email, password) => {
  const { error } = loginSchema.validate({ email, password });
  if (error) throw error;
  const user = await User.findOne({ where: { email } });
  console.log(user);
  const hashPassword = md5(password).toString();
  if (!user || user.dataValues.password !== hashPassword) {
    const errorUser = { code: BAD_REQUEST, message: BAD_REQUEST_MSG };
    throw errorUser;
  }
  const token = await jwt.sign({ email }, process.env.JWT_SECRET, OPTIONS);
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
  if (userExists) {
    const errorUser = { code: CONFLICT, message: CONFLICT_EMAIL_MSG };
    throw errorUser;
  }
  const hashPassword = md5(password).toString();
  await User.create({ name, email, password: hashPassword, role });
  return {
    message: 'User created successfully',
  };
};

module.exports = {
  getUserLoginService,
  registerNewUserService,
};
