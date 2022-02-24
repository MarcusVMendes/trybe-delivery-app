const rescue = require('express-rescue');
const {
  createNewUserService,
  getAllNonAdminUsersService,
} = require('../service/admin');
const { CREATED, OK } = require('../utils/dictionary');

const createNewUserController = rescue(async (req, res) => {
  const { authorization: token } = req.headers;
  const { name, email, password, role } = req.body;
  const createdUser = await createNewUserService(name, email, password, role, token);
  return res.status(CREATED).json(createdUser);
});

const getAllNonAdminUsersController = rescue(async (req, res) => {
  const { authorization: token } = req.headers;
  const allNonAdminUsers = await getAllNonAdminUsersService(token);
  return res.status(OK).json(allNonAdminUsers);
});

module.exports = {
  createNewUserController,
  getAllNonAdminUsersController,
};