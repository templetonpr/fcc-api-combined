"use strict";

let rqst       = require('request');
let express    = require('express');
let validator  = require('validator');
let bodyParser = require('body-parser');
let pgp        = require('pg-promise')();


let router = express.Router();

let db, port;
router.use(function (req, res, next) {
  db = pgp(req.app.get('DATABASE_URL'));
  port = req.app.get('port');
  next();
});

let infoPage = {
  title: 'URL Shortener',
  shortDesc: "TODO",
  usage: "TODO",
  output: 'TODO'
};

router.get('/', function (req, res) {
  res.render('urlShortener', infoPage);
});

router.get('/new', function (req, res) {
  res.render('urlShortener', infoPage);
});

router.get('/:short_code', function (req, res, next) {
  let shortCode = req.params.short_code;

  db.task(function (t) {
    return t.one('SELECT * FROM urls WHERE p_id=$1', shortCode)

    .then(function (row) {
      let newCount = row.access_count + 1;
      return t.one('UPDATE urls SET access_count = $1 WHERE p_id = $2 RETURNING *', [newCount, shortCode]);
    });

  }).then(function (data) {
    return res.redirect(data.url);

  }).catch(function (error) {
    let err = new Error();
    if (error.message == "No data returned from the query.") {
      err.message = "URL doesn't exist";
      err.status = 404;
    } else {
      err.message = error.message || "Database error. Please try again in a moment.";
      err.status = error.status || 500;
    }
    next(err);
  });
});

router.post('/new', function (req, res, next) {
  let url = req.body.original_url;
  let hostname = getHostname(req);
  let status = 500;

  db.task(function (t) {

    return doURLCheck(url)

    .then(function (returnCode) {
        return t.oneOrNone('SELECT * FROM urls WHERE url=$1', url);
      })
      .then(function (data) {
        if (data === null) {
          status = 201;
          let queryString = 'INSERT INTO urls (url, created_on, access_count) VALUES ($1, $2, 0) RETURNING *';
          let params = [url, Date.now().toString()];
          return t.one(queryString, params);
        } else {
          status = 200;
          return data;
        }
      });

  }).then(function (data) {
    //success
    res.status(status);
    res.json({
      original_url: data.url,
      short_url: hostname + data.p_id
    });


  }).catch(function (error) {
    let e = new Error();
    e.message = error.message || "Database error. Please try again in a moment.";
    e.status = error.status || 500;
    //next(e);
    res.status(e.status);
    res.json({
      error: e.message
    });
  });
});

module.exports = router;


function getHostname(req) {
  let hostname = req.protocol + "://" + req.hostname;
  if (req.hostname === "localhost") hostname += ":" + port;
  hostname += "/";
  return hostname;
}

function doURLCheck(url) {
  let p = new Promise(function (resolve, reject) {

    if (!validator.isURL(url)) {
      let e = new Error("Invalid URL");
      e.status = 400;
      reject(e);
    }

    let options = {
      url: url,
      method: 'HEAD',
      followAllRedirects: true
    };

    let returnCode = 500;
    rqst(options, function (error, response) {

      if (error) {
        let e = new Error("There was a problem checking the URL. Please make sure it is correct and try again.");
        e.status = 400;

        if (error.code === 'ETIMEOUT') {
          e.status = 404;
          e.message = "Server not found. Please make sure it is correct and try again.";
        }
        reject(e);

      } else if (response && response.statusCode >= 400) {
        let e = new Error("There was a problem checking the URL. Please make sure it is correct and try again.");
        e.status = response.statusCode;
        reject(e);

      } else if (response && response.statusCode < 400) {
        resolve(response.statusCode);

      } else {
        let e = new Error("There was a problem checking the URL. Please make sure it is correct and try again.");
        e.status = 500;
        reject(e);
      }

    });
  });
  return p;
}
