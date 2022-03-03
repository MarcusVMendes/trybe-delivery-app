const router = require('express').Router();

const auth = require('../utils/auth');

const {
  createSaleController,
  getSalesController,
} = require('../controller/sale');

router.post('/', auth, createSaleController);

router.get('/', getSalesController);

module.exports = router;