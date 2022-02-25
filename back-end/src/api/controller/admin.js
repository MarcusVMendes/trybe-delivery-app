const rescue = require('express-rescue');
const {
  createNewUserService,
  getAllNonAdminUsersService,
  deleteUserService,
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

const deleteUserController = rescue(async (req, res) => {
  const { id } = req.params;
  const { authorization: token } = req.headers;
  const deletedUser = await deleteUserService(id, token);
  return res.status(OK).json(deletedUser);
});

module.exports = {
  createNewUserController,
  getAllNonAdminUsersController,
  deleteUserController,
};