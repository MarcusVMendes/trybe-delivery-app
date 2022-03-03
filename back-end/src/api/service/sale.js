const { Sale, SaleProduct, Product, User, sequelize } = require('../../database/models');
const { dataSaleSchema } = require('../utils/validation');

const createSaleService = async (dataSale, userId) => {
  const { error } = dataSaleSchema.validate({ ...dataSale });
  if (error) throw error;

  const result = sequelize.transaction(async (insertionsSaleAndSaleProduct) => {
    const sale = await Sale.create(
      { ...dataSale, userId },
      { transaction: insertionsSaleAndSaleProduct },
    );

    const { products } = dataSale;

    /** 
     * MAP RETORNA UM ARRAY DE PROMISES PARA O Promise.all(). 
     * SE TODAS AS PROMISES ESTIVEREM RESOLVIDAS, O Promise.all = RESOLVE, SENÃO Promise.all = REJECT
     * E A TRANSAÇÃO NÃO SERÁ CONCLUÍDA. OU SEJA, A TRANSAÇÃO SERÁ CONCLUÍDA SE TODAS AS PROMISES FOREM RESOLVIDAS.
    */
    await Promise.all(products.map(async (product) => SaleProduct.create(
      { saleId: sale.id, ...product },
      { transaction: insertionsSaleAndSaleProduct },
    )));

    return sale;
  });

  return result;
};

const getSalesService = async () => {
  const sales = await Sale.findAll({
    attributes: ['id', 'status', 'saleDate', 'totalPrice'],
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['name'],
      },
    ],
  });

  return sales;
};



module.exports = {
  createSaleService,
  getSalesService,
  getSalesByIDService,
};
