const rescue = require('express-rescue');

const {
  getProductsService,
} = require('../service/product');

const { OK } = require('../utils/dictionary');

const getProductsController = rescue(async (_req, res) => {
  const products = await getProductsService();

  return res.status(OK).json({ products });
});

module.exports = {
  getProductsController,
};
