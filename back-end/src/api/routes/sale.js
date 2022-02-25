const { createSaleController } = require('../controller/sale');

const router = require('express').Router();

router.post('/', createSaleController);

module.exports = router;