const router = require('express').Router();
const auth = require('../utils/auth');
const {
  createNewUserController,
  getAllNonAdminUsersController,
  deleteUserController,
} = require('../controller/admin');

router.post('/register', auth, createNewUserController);
router.get('/', auth, getAllNonAdminUsersController);
router.delete('/:id', auth, deleteUserController);

module.exports = router;