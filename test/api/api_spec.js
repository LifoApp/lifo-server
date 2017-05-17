exports.lab = require('lab').script();

/* eslint-disable no-unused-vars */
const lab = exports.lab;
const describe = lab.describe;
const it = lab.it;
const before = lab.before;
const beforeEach = lab.beforeEach;
const after = lab.after;
const afterEach = lab.afterEach;
const expect = require('chai').expect;
/* eslint-enable no-unused-vars */

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
