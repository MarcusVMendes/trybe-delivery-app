const router = require('express').Router();
const auth = require('../utils/auth');
const {
  createNewUserController,
  getAllNonAdminUsersController,
} = require('../controller/admin');

router.post('/', auth, createNewUserController);
router.get('/', auth, getAllNonAdminUsersController);

module.exports = router;