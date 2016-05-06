"use strict";

let fs       = require('fs');
let mocha    = require('mocha');
let chai     = require('chai');
let chaiHttp = require('chai-http');

let app  = require(__dirname + "/../app.js");

let expect = chai.expect;
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

  it('should correctly respond to POST /fmd with a valid file', function(done) {
    chai.request(app)
      .post('/fmd')
      .attach('uploaded-file', fs.readFileSync(__dirname + '/smallimg.jpg'), 'smallimg.jpg')
      .end(function(err, res) {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        let text = JSON.parse(res.text);
        expect(text).to.have.property("name", "smallimg.jpg");
        expect(text).to.have.property("size", 18106);
        done();
      });
  });
  
  it('should correctly respond to POST /fmd with a file that is too large', function(done) {
    chai.request(app)
      .post('/fmd')
      .attach('uploaded-file', fs.readFileSync(__dirname + '/bigimg.jpg'), 'bigimg.jpg')
      .end(function(err, res) {
        expect(res).to.have.status(413);
        expect(res).to.be.json;
        let text = JSON.parse(res.text);
        expect(text).to.have.property("error");
        done();
      });
  });
});