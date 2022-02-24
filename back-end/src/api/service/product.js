const { Product } = require('../../database/models');

const getProductsService = async () => {
  const result = await Product.find().toArray();
  console.log(result);
};

module.exports = {
  getProductsService,
};
