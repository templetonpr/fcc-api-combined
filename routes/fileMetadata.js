var express = require('express');
var multer = require('multer');
var router = express.Router();


var FMD_MAX_FILE_SIZE, FMD_SAVE_FILES, storage, upload;

router.use(function fmdConfig(req, res, next) {
  FMD_MAX_FILE_SIZE = req.app.get('FMD_MAX_FILE_SIZE');
  FMD_SAVE_FILES = req.app.get('FMD_SAVE_FILES');

  if (FMD_SAVE_FILES) { //If SAVE_FILES is set, store in /uploads, else use memory
    storage = multer.diskStorage({
      destination: function(req, file, cb) {
        cb(null, './uploads');
      },
      filename: function(req, file, cb) {
        cb(null, file.mimetype.split("/")[0] + '-' + Date.now() + '.' + file.mimetype.split("/")[1])
      }
    });
  } else {
    storage = multer.memoryStorage();
  }

  upload = multer({ // upload settings
    storage: storage,
    limits: {fileSize: FMD_MAX_FILE_SIZE},
    fileFilter: function (req, file, cb) {
      if (file.size > FMD_MAX_FILE_SIZE) {
        cb(new Error("File exceeds maximum size of " + FMD_MAX_FILE_SIZE + " bytes."));
      } else {
        cb(null, true);
      }
    }
  }).single('uploaded-file');

  next();
});

router.get('/', function(req, res) {
  res.render('fileMetadata', {
    title: "File Metadata",
    shortDesc: "Injests a file and returns a json object with metadata about that file",
    FMD_MAX_FILE_SIZE: FMD_MAX_FILE_SIZE.toString(),
    usage: 'POST / { "uploaded-file": your file }',
    output: '{ "name": filename, "size": size in bytes }'
  });
});

router.post('/', function(req, res, next) {
  upload(req, res, function(err) {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        err.status = 413;
        // res.status(413).send("<p>Error: upload exceeded max size of " + FMD_MAX_FILE_SIZE + " bytes.");
        next(err);
      } else {
        // res.send("<p>There was an error processing your file. Please try again.</p>");
        next(err);
      }
    } else {
      res.json({
        "name": req.file.originalname,
        "size": req.file.size
      });
    }
  });
});

module.exports = router;
