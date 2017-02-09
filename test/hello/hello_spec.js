const expect = require('chai').expect;

describe('Hello', () => {
  it('Testing works', (done) => {
    expect('hello').to.eql('hello');
    done();
  });
});
