var express = require('express');
var moment = require('moment');

var router = express.Router();

router.get("/", function(req, res) {
    res.render('timestamp', {
      title: 'Timestamp Microservice',
      shortDesc: "Microservice that accepts either a unix timestamp or date, and responds with a JSON string that contains the date in both formats.",
      usage: "GET /ts/December%2015,%202015",
      output: '{ "unix": 1450137600, "natural": "December 15, 2015" }'
    });
});

router.get("/:date", function(req, res) {
  var date = moment(req.params.date, ["MMMM D, YYYY", "X"]);
  if (!date.isValid()) { // moment can't parse the date
    res.json({"unix":null,"natural":null});
  } else {
    var resDate = {
      "unix": date.format("X"),
      "natural": date.format("MMMM D, YYYY")
    };
    res.json(resDate);
  }
});

module.exports = router;
