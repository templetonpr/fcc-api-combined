var mocha = require('mocha');
var chai = require('chai');
var chaiHttp = require('chai-http');

var app = require(__dirname + "/../app.js");

var expect = chai.expect;
chai.use(chaiHttp);

describe('urlShortener', function () {

  it('should correctly respond to GET /urls', function (done) {
    chai.request(app)
      .get('/urls')
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          expect(res).to.have.status(200);
          expect(res).to.be.html;
          done();
        }

      });
  });

  it('should correctly respond to GET /urls/new', function (done) {
    chai.request(app)
      .get('/urls/new')
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          expect(res).to.have.status(200);
          expect(res).to.be.html;
          done();
        }

      });
  });

  it('should correctly respond to GET /urls/:shortCode with a valid url', function (done) {
    chai.request(app)
      .get('/urls/1')
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          expect(res).to.have.status(200);
          expect(res).to.be.hmtl;
          done();
        }
      });
  });

  it('should correctly respond to GET /urls/:shortCode with an invalid url', function (done) {
    chai.request(app)
      .get('/urls/9999999')
      .end(function (err, res) {
        expect(res).to.have.status(404);
        expect(res).to.be.html;
        done();
      });
  });

  it('should correctly respond to POST /urls/new with a valid url', function (done) {
    chai.request(app)
      .post('/urls/new')
      .send({"original_url": "http://www.google.com"})
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          expect(res.statusCode).to.be.oneOf([201, 200]);
          expect(res).to.be.json;
          done();
        }
      });
  });

  it('should correctly respond to POST /urls/new with an invalid url', function (done) {
    chai.request(app)
      .post('/urls/new')
      .send({"original_url": "qwerqwerqwer"})
      .end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        done();
      });
  });
});
