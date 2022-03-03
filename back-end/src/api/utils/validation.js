const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().email().not().empty()
    .required(),
  password: Joi.string().not().empty()
    .required(),
});

const registerSchema = Joi.object({
  name: Joi.string().not().empty()
    .required(),
  email: Joi.string().email().not().empty()
    .required(),
  password: Joi.string().not().empty()
    .required(),
});

const dataSaleSchema = Joi.object({
  totalPrice: Joi.number().not().empty()
    .required(),
  deliveryAddress: Joi.string().not().empty()
    .required(),
  deliveryNumber: Joi.string().not().empty()
    .required(),
  status: Joi.string().not().empty()
    .required(),
  products: Joi.array().not().empty()
    .required(),
  sellerId: Joi.number().not().empty()
    .required(),
});

module.exports = {
  loginSchema,
  registerSchema,
  dataSaleSchema,
};