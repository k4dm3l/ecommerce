const { Router } = require('express');
const router = Router();
const ProductsServices = require('../../services/products');
const { config } = require('../../config');

const productService = new ProductsServices();

const cacheResponse = require('../../utils/cacheResponse');
const { FIVE_MINUTES_IN_SECONDS } = require('../../utils/time');

router.get('/', async (req, res, next) => {
  cacheResponse(res, FIVE_MINUTES_IN_SECONDS);

  try {
    const { tags } = req.query;  
    const products = await productService.getProducts({ tags });

    res.render('products', { products, dev: config.dev });
  } catch (error) {
    next(error);
  }
});

module.exports = router;