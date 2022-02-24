const { Product } = require('../../database/models');

const getProductsService = async () => {
  const products = await Product.findAll();

  return products;
};

module.exports = {
  getProductsService,
};
