var mocha    = require('mocha');
var chai     = require('chai');
var chaiHttp = require('chai-http');

var app  = require(__dirname + "/../app.js");

var expect = chai.expect;
chai.use(chaiHttp);

describe('imgSearch', function() {

  it('should correctly respond to GET /img', function(done) {
    chai.request(app)
      .get('/img')
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res).to.be.html;
        done();
      });
  });

  it('should correctly respond to GET /img/latest');
  it('should correctly respond to GET /img/search/:searchterm');
  it('should correctly respond to GET /img/search/:searchterm?offset=n');
});