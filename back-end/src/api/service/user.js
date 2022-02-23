const { loginSchema } = require('../utils/validation');
const md5 = require('crypto-js/md5');
const { User } = require('../../database/models');
const jwt = require('jsonwebtoken');
const { BAD_REQUEST, BAD_REQUEST_MSG } = require('../utils/dictionary');
require('dotenv').config();

const OPTIONS = {
  expiresIn: 3600,
  algorithm: 'HS256',
};

const getUserLoginService = async (email, password) => {
  const { error } = loginSchema.validate({ email, password });
  if (error) throw error;
  const user = await User.findOne({ where: { email } });
  const hashPassword = md5(password).toString();
  console.log(hashPassword);
  if (!user || user.dataValues.password !== hashPassword) {
    const errorUser = { code: BAD_REQUEST, message: BAD_REQUEST_MSG }
    throw errorUser;
  }
  const token = await jwt.sign({ email }, process.env.JWT_SECRET, OPTIONS)
  return { token };
};

module.exports = {
  getUserLoginService,
}
