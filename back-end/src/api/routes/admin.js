const router = require('express').Router();
const auth = require('../utils/auth');
const {
  createNewUserController,
} = require('../controller/admin');

router.post('/', auth, createNewUserController);

module.exports = router;