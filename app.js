/**
* Module dependencies.
*/
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , session = require('express-session')
  , mysql      = require('mysql')
  , bodyParser=require("body-parser")
  , connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'crypto_exchange'
    });


var app = express();

app.use(bodyParser.urlencoded({ extended: false }));


// make a connection  
connection.connect();
 
global.db = connection;



app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));



app.get('/', routes.index);//call for main index page
app.get('/login', user.login);//call for login page
app.get('/signup', user.signup);//call for signup page
app.get('/home/dashboard', user.dashboard);//call for dashboard page after login
app.post('/signup', user.signup);//call for signup post





 
// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/'));


 
//Middleware
app.listen(8080);