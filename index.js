var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node'
});

conn.connect(function(err){
    if(err) throw err;
    console.log('connection established');
});

app.get('/', function(req, res){
    res.render('home');
});

app.get('/insert', function(req, res){
    res.render('insert');
});




app.post('/insert', function(req, res){
        var name = req.body.name;
        var email = req.body.email;
        var password = req.body.password;

        var sql = `insert into user(name,email,password) values('${name}','${email}','${password}')`;
        conn.query(sql,function(err,results){
                if(err) throw err;
                res.redirect('/show');
        });
});

app.get('/show', function(req, res){
    var sql = "select * from user";

    conn.query(sql,function(err,results){
        if(err) throw err;
        res.render('show',{users:results});
    });
    
});

app.get('/delete/:id',function(req, res){
    var id = req.params.id;
    var sql = `delete from user where id='${id}'`;

    conn.query(sql,function(err,results){
        if(err) throw err;
        res.redirect('/show');
    });

});

app.get('/edit/:id',function(req, res){
    var id = req.params.id;
    var sql = `select * from user where id='${id}'`;

    conn.query(sql,function(err,results){
        if(err) throw err;
        res.render('edit',{users:results});
    });

});

app.post('/update/:id',function(req, res){
    var id = req.params.id;
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    var sql = `update user set name='${name}', email='${email}', password='${password}' where id='${id}'`;

    conn.query(sql,function(err,results){
        if(err) throw err;
        res.redirect('/show');
    });
});

var server = app.listen(3000,function(){
    console.log('server listening on port 3000');
});