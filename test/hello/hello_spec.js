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

describe('Hello', () => {
  it('Testing works', (done) => {
    expect('hello').to.eql('hello');
    done();
  });
});
