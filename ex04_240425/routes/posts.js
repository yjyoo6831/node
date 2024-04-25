var express = require('express');
var router = express.Router();
var db=require('../db.js');

/* 게시판 목록페이지 이동 */
router.get('/', function(req, res, next) {
  res.render('index.ejs', { title: '게시판', pageName : 'posts/list.ejs'});
});
//게시판 목록 데이터 불러오기
router.get('/list.json',function(req,res){
    const sql='select * from posts order by pid desc';
    db.get().query(sql,function(err,rows){
        if(err){
            console.log("게시판 목록 : error : ---- ",err)
        }else{
            res.send(rows);
        }
    });
});

module.exports = router;