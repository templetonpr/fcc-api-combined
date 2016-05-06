var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('timestamp', {
      title: 'Image Search Abstraction Layer',
      shortDesc: "TODO",
      usage: "TODO",
      output: 'TODO'
    });
});

router.get('/search', function(req, res) {
  res.redirect('/img');
});

router.get('/latest', function(req, res) {
  // query db for 10 newest rows and return
  res.set('Content-Type', 'application/json');
  let dummyList = [1,2,3,4,5,6,7,8,9,0];
  res.json({latest: dummyList});
});

router.get('/search/:searchTerm', function(req, res) {
  let searchTerm = req.params.searchTerm;
  let offset = req.query.offset || 0;
  // do image search for searchTerm, and return 10 results, offset by offset
  res.json({searchTerm: searchTerm, offset: offset});
});

module.exports = router;
