const Joi = require('joi');

const productIdSchema = Joi.object().keys({
  productId: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
});

const productTagSchema = Joi.array().items(Joi.string().trim().max(10));

const createProductSchema = {
  name: Joi.string().trim().max(50).required(),
  price: Joi.number().min(1).max(1000).required(),
  image: Joi.string().trim().required(),
  tags: productTagSchema
}

const updateProductSchema = {
  name: Joi.string().trim().max(50),
  price: Joi.number().min(1).max(1000),
  image: Joi.string().trim(),
  tags: productTagSchema
}

module.exports = {
  productIdSchema,
  createProductSchema,
  updateProductSchema,
  productTagSchema
}