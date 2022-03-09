const router = require('express').Router();
const {
  getUserLoginController,
  registerNewUserController,
  getUserByEmailController,
} = require('../controller/user');

router.post('/login', getUserLoginController);
router.post('/register', registerNewUserController);
router.get('/:email', getUserByEmailController );

module.exports = router;