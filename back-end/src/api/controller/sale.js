const rescue = require('express-rescue');

const {
  createSaleService,
} = require('../service/sale');

const createSaleController = rescue(async (req, res) => {
  const dataSale = req.body;
  const { id: userId } = req.user;

  await createSaleService(dataSale, userId);

  return res.status(201).json({ message: 'Venda criada' });
});

module.exports = {
  createSaleController,
};
