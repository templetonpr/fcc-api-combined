var mocha    = require('mocha');
var chai     = require('chai');
var chaiHttp = require('chai-http');

var app  = require(__dirname + "/../app.js");

var expect = chai.expect;
chai.use(chaiHttp);

var moment = require('moment');
var testDate = moment();
var unixTime = testDate.format('X', true);
var natDate = testDate.format('MMMM D, YYYY', true);

describe('timestamp', function() {

  it('should correctly respond to GET /ts', function(done) {
    chai.request(app)
      .get('/ts')
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res).to.be.html;
        done();
      });
  });

  it('should correctly respond to GET /ts/:date', function(done) {
    chai.request(app)
      .get('/ts/' + unixTime)
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.unix).to.equal(unixTime);
        expect(res.body.natural).to.equal(natDate);
        done();
      });
  });
});