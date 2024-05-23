var express = require('express');
var router = express.Router();
var db = require('../db.js');
const { route } = require('./index.js');

/* 게시판 목록페이지 이동 */
router.get('/', function (req, res, next) {
    res.render('index.ejs', { title: '게시판', pageName: 'posts/list.ejs' });
});
//게시판 목록 데이터 불러오기
router.get('/list.json', function (req, res) {
    
    //에러
    const page=req.query.page;
    const size=parseInt(req.query.size);
    const start =(page-1) * size;

    let lsql = 'select *,date_format(pdate,\'%Y %M %d %T\') as fdate from posts order by pid desc limit ?,?';
    console.log(lsql,start,size);
    db.get().query(lsql,[start,size], function (err, rows) {
        if (err) {
            console.log("게시판 목록 : error", err)
        } else {
            res.send(rows);
        }
        const documentsss=rows;
        lsql="select count(*) ctotal from posts";
        db.get.query(lsql,function(err,rows){
            const ltotal=rows[0].ctotal;
            res.send({documentsss,ltotal});

        });
    });
});
//글쓰기 페이지로 이동
router.get('/insert', function (req, res) {
    res.render('index.ejs', { title: '글쓰기', pageName: 'posts/insert.ejs' })
});
//글을 DB저장
router.post('/insert', function (req, res) {
    const title = req.body.title;
    const contents = req.body.contents;
    const uid = req.body.uid;
    console.log(title, contents, uid);
    const sql = "insert into posts(title,contents,writer) values(?,?,?)";

    db.get().query(sql, [title, contents, uid], function (err, rows) {

    });
    res.redirect('/posts');

});
//게시글 read 페이지 이동
router.get('/read', function (req, res) {
    const pid = req.query.pid;
    console.log(pid);
    const sql = "select *,date_format(pdate,\'%Y %M %d %T\') as fdate from posts where pid=? order by pid desc";
    db.get().query(sql, [pid], function (err, rows) {
        if (err) {
            console.log('읽기오류:', err);
        }
        console.log(rows[0]);
        res.render('index.ejs', { title: '게시글정보', pageName: 'posts/read.ejs', post: rows[0] });
    });
});

//게시글 삭제
router.get('/delete', function (req, res) {   //함수
    const pid = req.query.pid;
    console.log('....', pid);

    const sql = "delete from posts where pid=?"
    db.get().query(sql, [pid], function (err, rows) {
        if (err) {
            console.log('삭제오류:', err)
        }
        res.redirect("/posts");
    });
});

//수정페이지로 이동
router.get('/update', function (req, res) {
    const pid = req.query.pid;
    const sql = "select * from posts where pid=?";
    db.get().query(sql, [pid], function (err, rows) {
        if (err) {
            console.log('수정오류:', err)
        }
        const post = rows[0]; //post 는 객체(object)로 찍힘.
        res.render('index.ejs', { title: '게시글수정', pageName: 'posts/update.ejs', post: post });
    });
});
//데이터 수정
router.post('/update', function (req, res) {
    const pid = req.body.pid;
    const title = req.body.title;
    const contents = req.body.body;
    console.log(pid, title, contents);
    const sql = "update posts set title=?,contents=?,pdate=now() where pid=?";
    db.get().query(sql, [pid, contents, pid], function (err, rows){
        if(err){
            console.log("데이터 수정 에러:",err)
        }
        res.redirect('/posts');
    });

});
module.exports = router;