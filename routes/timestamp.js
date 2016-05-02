var express = require('express');
var moment = require('moment');

var router = express.Router();

router.get("/", function(req, res) {
    res.render('timestamp', { title: 'Timestamp Microservice' });
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
