const router = require('express').Router();
const {
  getUserLoginController,
  registerNewUserController,
} = require('../controller/user');

router.post('/login', getUserLoginController);
router.post('/register', registerNewUserController);

module.exports = router;