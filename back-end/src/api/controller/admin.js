const rescue = require('express-rescue');
const {
  createNewUserService,
} = require('../service/admin');
const { CREATED } = require('../utils/dictionary');

const createNewUserController = rescue(async (req, res) => {
  const { authorization: token } = req.headers;
  const { name, email, password, role } = req.body;
  const createdUser = await createNewUserService(name, email, password, role, token);
  return res.status(CREATED).json(createdUser);
});

module.exports = {
  createNewUserController,
};