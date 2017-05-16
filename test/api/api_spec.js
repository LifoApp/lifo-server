const { expect } = require('chai');
const server = require('../../server.js');

const reqDef = {
  method: 'GET',
  url: '/api',
  payload: {},
};

describe('API', () => {
  it('Testing works', () => {
    const req = Object.assign({}, reqDef, {
      url: '/api/hello',
    });

    return server.inject(req).then((res) => {
      expect(res.statusCode).to.equal(200);
      expect(res.result).to.be.a('object');
    });
  });
});
