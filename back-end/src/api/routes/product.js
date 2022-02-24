const router = require('express').Router();

const {
  getProductsController,
} = require('../controller/product');

router.get('/', getProductsController);

module.exports = router;