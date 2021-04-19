const assert = require('assert');
const proxyquire = require('proxyquire');

const {
  MongoLibMock,
  getAllStub,
  createStub
} = require('../utils/mocks/mongoLib');

const { filteredProductsMock, productMocks } = require('../utils/mocks/products');

describe('services - products', () => {
  const ProductsService = proxyquire('../services/products', {
    '../lib/mongo': MongoLibMock
  });

  const productService = new ProductsService();

  describe('When getProducts method is called', async () => {
    it(' Should call the getAll MongoLib method', async () => {
      await productService.getProducts({});
      assert.strictEqual(getAllStub.called, true);
    });

    it(' Should return an array of products', async () => {
      const result = await productService.getProducts({});
      const expected = productMocks;
      assert.deepStrictEqual(result, expected);
    });
  });

  describe('When getProducts method is called with tags', async () => {
    it(' Should all the getAll MongoLib method with tags args', async() => {
      await productService.getProducts({ tags: ['expensive'] });
      const tagQuery = { tags: { $in: ['expensive'] } };
      assert.strictEqual(getAllStub.calledWith('products', tagQuery), true);
    });

    it(' Should return an array of products filtered by the tag', async () => {
      const result = await productService.getProducts({ tags: ['expensive'] });
      const expected = filteredProductsMock('expensive');
      assert.deepStrictEqual(result, expected);
    });
  });
});