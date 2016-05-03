var mocha    = require('mocha');
var chai     = require('chai');
var chaiHttp = require('chai-http');

var app  = require(__dirname + "/../app.js");

var expect = chai.expect;
chai.use(chaiHttp);

describe('headParse', function() {

  it('should correctly respond to GET /hp', function(done) {
    chai.request(app)
      .get('/hp')
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res).to.be.html;
        done();
      });
  });

  it('should correctly respond to /hp/whoami');
});