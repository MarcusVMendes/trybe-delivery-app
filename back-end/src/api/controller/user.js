const rescue = require('express-rescue');
const {
  OK,
  CREATED,
  NO_CONTENT,
  BAD_REQUEST,
  UNAUTHORIZED,
  NOT_FOUND,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
} = require('../utils/dictionary');

const {
  getUserLoginService,
} = require('../service/user');

const getUserLoginController = rescue(async (req, res) => {
  const { email, password } = req.body;
  const login = await getUserLoginService(email, password);
  return res.status(OK).json(login);
});


module.exports = {
  getUserLoginController,
}