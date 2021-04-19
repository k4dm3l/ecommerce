const productMocks = require('../utils/mocks/products')
const MongoLib = require('../lib/mongo');

class ProductsServices {
  constructor() {
    this.collection = 'products';
    this.mongoDb = new MongoLib();
  }

  async getProducts({ tags }) {
    try {
      const query = tags && { tags: { $in: tags } };
      const products = await this.mongoDb.getAll(this.collection, query);

      return products || [];
    } catch (error) {
      console.log(error);
    }
  }

  async getProduct({ productId }) {
    try {
      const product = await this.mongoDb.get(this.collection, productId);
      return product || {};
    } catch (error) {
      console.log(error);
    }
  }

  async createProduct({ product }) {
    try {
      const newProduct = await this.mongoDb.create(this.collection, product);
      return newProduct;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct({ productId, product }) {
    try {
      const updatedProduct = await this.mongoDb.update(this.collection, productId, product);
      return updatedProduct;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct({ productId }) {
    try {
      const deletedProduct = await this.mongoDb.delete(this.collection, productId);
      return deletedProduct;
    } catch (error) {
      console.log(error);
    }
  }

}

module.exports = ProductsServices