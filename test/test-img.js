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

  it('should correctly respond to GET /img/latest', function(done) {
    chai.request(app)
      .get('/img/latest')
      .end(function(err, res) {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        let text = JSON.parse(res.text);
        expect(text).to.have.property('latest');
        done();
      });
  });
  
  it('should correctly respond to GET /img/search/:searchterm', function(done) {
    let searchTerm = "Dogs with goggles";
    let offset = "10";
    chai.request(app)
      .get('/img/search/' + searchTerm + "?offset=" + offset)
      .end(function(err, res) {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        let text = JSON.parse(res.text);
        expect(text).to.have.property('searchTerm', searchTerm);
        expect(text).to.have.property('offset', offset);
        done();
      });
  });
});