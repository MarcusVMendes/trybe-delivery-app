const rescue = require('express-rescue');

const {
  OK,
  CREATED,
} = require('../utils/dictionary');

const {
  createSaleService,
  getSalesService,
  getSaleByIDService,
} = require('../service/sale');

const createSaleController = rescue(async (req, res) => {
  const dataSale = req.body;
  const { id: userId } = req.user;

  const { dataValues } = await createSaleService(dataSale, userId);
  console.log(dataValues);

  return res.status(CREATED).json({ dataValues });
});

const getSalesController = rescue(async (_req, res) => {
  const sales = await getSalesService();

  return res.status(OK).json({ sales });
});

const getSaleByIDController = rescue(async (req, res) => {
  const { id } = req.params;
  const sale = await getSaleByIDService(id);

  return res.status(OK).json({ sale });
});

module.exports = {
  createSaleController,
  getSalesController,
  getSaleByIDController,
};
