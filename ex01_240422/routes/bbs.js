var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.ejs', { title: '게시판', pageName:'bbs.ejs' }); //render : index 를 출력 
});

module.exports = router;
