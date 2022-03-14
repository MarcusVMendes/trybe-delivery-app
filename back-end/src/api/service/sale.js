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
    include: [
      { model: User, as: 'user', attributes: ['id', 'name'] },
      { model: User, as: 'seller', attributes: ['id', 'name'] },
    ],
  });

  return sales;
};

const getSaleByIDService = async (id) => {
  const sale = await Sale.findByPk(id, {
    // attributes: { exclude: ['deliveryAddress', 'deliveryNumber'] },
    include: [
      {
        model: Product, // Sale POSSUI ASSOCIAÇÃO COM Product
        as: 'products', // ATRAVÉS DESTE ALIAS (definidos em SaleProduct)
        through: { attributes: ['quantity'] }, // DESSA ASSOCIAÇÃO É POSSÍVEL OBTER DADOS DA TABELA DE JUNÇÃO
        attributes: { exclude: ['url_image'] }, // ATRIBUTOS DA TABELA Products
      },
      { model: User, as: 'user', attributes: ['id', 'name'] },
      { model: User, as: 'seller', attributes: ['id', 'name'] },
    ],
  });

  return sale;
};

const updateSaleByIdService = async (id, status) => {
  const sale = await Sale.update(
    { status },
    { where: { id } },
  );
  return sale;
};

module.exports = {
  createSaleService,
  getSalesService,
  getSaleByIDService,
  updateSaleByIdService,
};
