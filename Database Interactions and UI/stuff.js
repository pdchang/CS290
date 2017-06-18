//Philip Chang - Week 9 - Database interactions and UI
var express = require("express");
var app = express();

var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var session = require('express-session');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var request = require('request');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 4841);

var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs290_changp',
  password        : 'cs290changp',
  database        : 'cs290_changp'
});


app.get('/reset-table',function(req,res,next){
  var context = {};
  pool.query("DROP TABLE IF EXISTS workouts", function(err){
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('home',context);
    })
  });
});

app.get('/insert',function(req,res,next){
  var context = {};
  console.log("test");
  console.log(req.query);
  pool.query("INSERT INTO workouts (name, reps, weight, date, lbs) VALUES (?,?,?,?,?)", [req.query.name,req.query.reps,req.query.weight,req.query.date,req.query.lbs], function(err, result){
    if(err){
      next(err);
      return;
    }
  });
  pool.query('SELECT id, name, reps, weight, date, lbs FROM workouts', function(err, rows, results){
    if(err){
      next(err);
      return;
    }
    context.results = rows;
    res.send(JSON.stringify(context));
});
});


app.get('/',function(req,res,next){
  var context = {};
  pool.query('SELECT * FROM workouts', function(err, rows, fields){
    context.results = rows;
    res.render('home', context);
});
});


app.get('/edit',function(req,res,next){
  var context = {};
  pool.query("SELECT * FROM workouts WHERE id=?", [req.query.id], function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = rows[0];
    res.render('update', context);
});
});



app.get('/update',function(req,res,next){
  var context = {};

  pool.query("SELECT * FROM workouts WHERE id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
    return;
  }
  if(result.length == 1){
  var curVals = result[0];
  pool.query("UPDATE workouts SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id = ?",
  [req.query.name || curVals.name, req.query.reps || curVals.reps, req.query.weight || curVals.weight, req.query.date || curVals.date, req.query.lbs || curVals.lbs, req.query.id], function(err, results){
    if(err){
      next(err);
    return;
  }
  pool.query('SELECT * FROM workouts', function(err, rows, fields){
    if(err){
      next(err);
    return;
    }
    context.results = rows;
  res.render('home', context);
      });
    });
    }
    });
    });

app.get('/delete',function(req,res,next){
  var context = {};
  pool.query("DELETE FROM workouts WHERE id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
  pool.query('SELECT * FROM workouts', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = rows;
    res.send(JSON.stringify(rows));

})
  });
});
//static
app.use(express.static(__dirname + '/public'));



//404 500
app.use(function(req,res){
  res.status(404);
  res.render('404.handlebars');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500.handlebars');
});
//////////////

app.listen(app.get('port'), function(){
  console.log('Express started on http://flip3.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});
