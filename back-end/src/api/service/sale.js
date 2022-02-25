const { Sale, SaleProduct, Product, sequelize } = require('../../database/models');
const { dataSaleSchema } = require('../utils/validation');

// userId
// sellerId

// totalPrice
// deliveryAddress
// deliveryNumber
// status
// products

// saleDate: Date.now()

const createSaleService = async (dataSale, userId) => {
  const { error } = dataSaleSchema.validate({ ...dataSale });
  if (error) throw error;

  const result = sequelize.transaction(async (insertionsSaleAndSaleProduct) => {
    const sale = await Sale.create(
      { ...dataSale, userId, saleDate: Date.now() },
      { transaction: insertionsSaleAndSaleProduct },
    );

    const { products } = dataSale;

    await sale.addProducts(
      products,
      { transaction: insertionsSaleAndSaleProduct },
    );

    return sale;
  });

  return result;
};

module.exports = {
  createSaleService,
};
