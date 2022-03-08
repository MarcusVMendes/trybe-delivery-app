const router = require('express').Router();

const auth = require('../utils/auth');

const {
  createSaleController,
  getSalesController,
  getSaleByIDController,
} = require('../controller/sale');

router.post('/', auth, createSaleController);

router.get('/:id', auth, getSaleByIDController);

router.get('/', auth, getSalesController);

module.exports = router;