const { Product } = require('../../database/models');

const getProductsService = () => {
  const result = Product.find().toArray();
  console.log(result);
};

module.exports = {
  getProductsService,
};
