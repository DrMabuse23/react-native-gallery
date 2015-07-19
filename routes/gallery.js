/**
 * Created by drmabuse on 18/07/15.
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res, next) {

  fs.readdir(__dirname + '/../public/images/gallery', function(error, files){
    if (error) {
      return res.status(404).json(error);
    }
    var temp = [];
    var uri = 'http://localhost:3000/images/gallery/';
    files.forEach(function (file) {
      temp.push(uri + file);
    })
    res.status(200).json(temp);
    console.log(temp);
  })
});

module.exports = router;
