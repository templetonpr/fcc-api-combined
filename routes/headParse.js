var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('headParse', {
    title: "Request Header Parser",
    shortDesc: "Get header info from HTTP request",
    usage: "GET /hp/whoami",
    output: '{\n"ipaddress": your public ip address, \n"language": your language, \n"software": your operating system \n}'
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
