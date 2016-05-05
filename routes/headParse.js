"use strict";

let express = require('express');
let router = express.Router();

router.get('/', function(req, res) {
  res.render('headParse', {
    title: "Request Header Parser",
    shortDesc: "Get header info from HTTP request",
    usage: "GET /hp/whoami",
    output: '{\n"ipaddress": your public ip address, \n"language": your language, \n"software": your operating system \n}'
  });
});

router.get('/whoami', function(req, res) {
  
  let ipaddress = req.ip ? req.ip : null;
  let language = req.headers["accept-language"] || null;
  let software = req.headers["user-agent"] || null;
  
  let info = {
    "ipaddress": ipaddress,
    "language": language,
    "software": software
  };

  res.status(200);
  res.json(info);
});

module.exports = router;
