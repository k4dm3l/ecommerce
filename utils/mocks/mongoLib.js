const { productMocks, filteredProductsMock } = require('./products');
const sinon = require('sinon');

const getAllStub = sinon.stub();
const createStub = sinon.stub();

const tagQuerry = { tags: { $in: ['expensive'] } };

getAllStub.withArgs('products').resolves(productMocks);
getAllStub.withArgs('products', tagQuerry).resolves(filteredProductsMock('expensive'));

createStub.resolves('6bedb1267d1ca7f3053e2875');

class MongoLibMock {
  getAll(collection, query) {
    return getAllStub(collection, query);
  }

  create(collection, data) {
    return createStub(collection, data);
  }
}

module.exports = {
  getAllStub,
  createStub,
  MongoLibMock
}