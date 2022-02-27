const auth = require('../utils/auth');

const { createSaleController } = require('../controller/sale');

const router = require('express').Router();

router.post('/', auth, createSaleController);

module.exports = router;