var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('this is 3000:/users page \n respond with a resource');
});

module.exports = router;
