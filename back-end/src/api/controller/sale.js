const rescue = require('express-rescue');

const {
  OK,
  CREATED,
} = require('../utils/dictionary');

const {
  createSaleService,
  getSalesService,
} = require('../service/sale');

const createSaleController = rescue(async (req, res) => {
  const dataSale = req.body;
  const { id: userId } = req.user;

  await createSaleService(dataSale, userId);

  return res.status(CREATED).json({ message: 'Venda criada' });
});

const getSalesController = rescue(async (_req, res) => {
  const sales = await getSalesService();

  return res.status(OK).json({ sales });
});

module.exports = {
  createSaleController,
  getSalesController,
};
