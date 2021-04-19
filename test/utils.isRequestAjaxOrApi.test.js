const assert = require('assert');
const isRequestAjaxOrApi = require('../utils/isRequestAjaxOrApi');

describe('utils - isRequestAjaxOrApi', () => {
  describe('When req accepts html and is not an XMLHttpRequest', () => {
    it(' Should return false', () => {
      const req = {
        accepts: () => true,
        xhr: false
      };

      const result = isRequestAjaxOrApi(req);
      const expected = false;

      assert.strictEqual(result, expected);
    });
  });

  describe('When req does not accept html and is not an XMLHttpRequest', () => {
    it(' Should return true', () => {
      const req = {
        accepts: () => false,
        xhr: false
      };

      const result = isRequestAjaxOrApi(req);
      const expected = true;

      assert.strictEqual(result, expected);
    });
  });

  describe('When req accepts html and is an XMLHttpRequest', () => {
    it(' Should return true', () => {
      const req = {
        accepts: () => true,
        xhr: true
      };

      const result = isRequestAjaxOrApi(req);
      const expected = true;

      assert.strictEqual(result, expected);
    });
  });
});