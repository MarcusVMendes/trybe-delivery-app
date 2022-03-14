const router = require('express').Router();

const auth = require('../utils/auth');

const {
  createSaleController,
  getSalesController,
  getSaleByIDController,
  updateSaleByIdController,
} = require('../controller/sale');

router.post('/', auth, createSaleController);

router.get('/:id', auth, getSaleByIDController);

router.get('/', auth, getSalesController);

router.put('/:id', auth, updateSaleByIdController);

module.exports = router;
