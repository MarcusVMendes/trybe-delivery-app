const router = require('express').Router();

const auth = require('../utils/auth');

const { createSaleController } = require('../controller/sale');

router.post('/', auth, createSaleController);

module.exports = router;