var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.ejs', { title: 'todo-list ', pageName:'todos.ejs' }); //render : index 를 출력 
});

module.exports = router;
