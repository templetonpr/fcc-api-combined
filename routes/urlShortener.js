var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('timestamp', {
      title: 'URL Shortener',
      shortDesc: "TODO",
      usage: "TODO",
      output: 'TODO'
    });
});

module.exports = router;
