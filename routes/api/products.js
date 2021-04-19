const passport = require('passport');
const { Router } = require('express');
const ProductsService = require('../../services/products');
const { 
  createProductSchema, 
  productIdSchema, 
  updateProductSchema,
  productTagSchema } = require('../../utils/schemas/products');
const { validationHandler } = require('../../utils/middlewares/validationHandler');

// JWT stategy
require('../../utils/auth/strategies/jwt');

// Cache Response
const cacheResponse = require('../../utils/cacheResponse');
const { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } = require('../../utils/time');

const productService = new ProductsService();

function productsApi (app) {
  const router = Router();

  app.use('/api/products', router);

  router.get(
    '/',
    async (req, res, next) => {
      cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
      const { tags } = req.query;
      try {
        const products = await productService.getProducts({ tags });
    
        res.status(200).json({
          status: 200,
          message: 'products listed',
          data: products
        });
      } catch (error) {
        next(error);
      }
  });
  
  router.get(
    '/:productId',
    validationHandler(productIdSchema, 'params'),
    async (req, res, next) => {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
      const { productId } = req.params;
    
      try {
        const product = await productService.getProduct({ productId });
    
        res.status(200).json({
          status: 200,
          message: 'products listed',
          data: product
        });
      } catch (error) {
        next(error);
      }
  });
  
  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    validationHandler(createProductSchema),
    async (req, res, next) => {
      const { body } = req;
    
      try {
        const product = await productService.createProduct({ product: body });
      
        res.status(201).json({
          status: 201,
          message: 'product created',
          data: product
        });
      } catch (error) {
        next(error);
      }
    }
  );
  
  router.put(
    '/:productId',
    passport.authenticate('jwt', { session: false }),
    validationHandler(productIdSchema, 'params'),
    validationHandler(updateProductSchema),
    async (req, res, next) => {
    const { productId } = req.params;
    const { body } = req;
  
    try {
      const updatedProduct = await productService.updateProduct({ productId, product: body });
  
      res.status(200).json({
        status: 200,
        message: 'product updated',
        data: updatedProduct
      });
    } catch (error) {
      next(error);
    }
  });
  
  router.delete(
    '/:productId',
    passport.authenticate('jwt', { session: false }),
    validationHandler(productIdSchema, 'params'),
    async (req, res, next) => {
    const { productId } = req.params;
    
    try {
      const product = await productService.deleteProduct({ productId });
  
      res.status(200).json({
        status: 200,
        message: 'product deleted',
        data: product
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = productsApi;