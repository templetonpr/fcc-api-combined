var mocha    = require('mocha');
var chai     = require('chai');
var chaiHttp = require('chai-http');

var app  = require(__dirname + "/../app.js");

var expect = chai.expect;
chai.use(chaiHttp);

describe('fileMetadata', function() {

  it('should correctly respond to GET /fmd', function(done) {
    chai.request(app)
      .get('/fmd')
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res).to.be.html;
        done();
      });
  });

  it('should correctly respond to POST /fmd with a valid file');
  it('should correctly respond to POST /fmd with a file that is too large');
});