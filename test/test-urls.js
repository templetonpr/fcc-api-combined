var mocha    = require('mocha');
var chai     = require('chai');
var chaiHttp = require('chai-http');

var app  = require(__dirname + "/../app.js");

var expect = chai.expect;
chai.use(chaiHttp);

describe('urlShortener', function() {

  it('should correctly respond to GET /urls', function(done) {
    chai.request(app)
      .get('/urls')
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res).to.be.html;
        done();
      });
  });

  it('should correctly respond to GET /urls/new');
  it('should correctly respond to GET /urls/:shortCode with a valid url');
  it('should correctly respond to GET /urls/:shortCode with an invalid url');
  it('should correctly respond to POST /urls/new with a valid url');
  it('should correctly respond to POST /urls/new with an invalid url');
});