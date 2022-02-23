const router = require('express').Router();
const {
  getUserLoginController,
} = require('../controller/user');

router.post('/', getUserLoginController);

module.exports = router;