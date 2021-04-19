const assert = require('assert');
const proxyquire = require('proxyquire');

const { productMocks, ProductsServiceMock } = require('../utils/mocks/products');

const testServer = require('../utils/testServer');

describe('routes - api - products', () => {
  const route = proxyquire('../routes/api/products', {
    '../../services/products': ProductsServiceMock
  });

  const request = testServer(route);

  describe('GET /products', () => {
    it('Should respond with status 200', (done) => {
      request.get('/api/products').expect(200, done);
    });

    it('Should respond with content type json', (done) => {
      request.get('/api/products').expect('Content-type', /json/, done);
    });

    it('Should respond with no error', (done) => {
      request.get('/api/products').end((err, res) => {
        assert.strictEqual(err, null);
        done();
      });
    });

    it('Should respond with the list of products', (done) => {
      request.get('/api/products').end((err, res) => {
        assert.deepStrictEqual(res.body, {
          data: productMocks,
          message: 'products listed',
          status: 200
        });
        done();
      });
    });
  });
});