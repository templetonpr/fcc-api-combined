var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('headParse', {
    title: "Request Header Parser",
    shortDesc: "Get header info from HTTP request",
    usage: "GET /hp/whoami",
    output: '{ "ipaddress": your public ip address, "language": your language, "software": your operating system }'
  });
});

router.get('/whoami', function(req, res) {
  var info = {
    "ipaddress": req.ip,
    "language": req.headers["accept-language"].split(",")[0],
    "software": req.headers["user-agent"].split("(")[1].split(")")[0]
  };
  res.json(info);
});

module.exports = router;
