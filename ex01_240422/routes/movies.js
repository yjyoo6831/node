var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.ejs', { title: '영화검색을 클릭함.movies.ejs' ,pageName:'movies.ejs'});
});

module.exports = router;
