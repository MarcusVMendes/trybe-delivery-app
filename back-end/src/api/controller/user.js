const rescue = require('express-rescue');
const {
  OK,
  CREATED,
} = require('../utils/dictionary');

const {
  getUserLoginService,
  registerNewUserService,
} = require('../service/user');

const getUserLoginController = rescue(async (req, res) => {
  const { email, password } = req.body;
  const login = await getUserLoginService(email, password);
  return res.status(OK).json(login);
});

const registerNewUserController = rescue(async (req, res) => {
  const { name, email, password, role = "customer" } = req.body;
  const user = await registerNewUserService(name, email, password, role);
  return res.status(CREATED).json(user);
});

module.exports = {
  getUserLoginController,
  registerNewUserController,
};