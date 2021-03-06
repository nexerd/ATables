var http = require("http");
var express = require("express");
var logger = require("morgan");
var favicon = require("serve-favicon");
var static = require("serve-static");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var cookieSession = require("cookie-session");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var mongoose = require("./model/mongooseConnect");	

//var fs = require("fs");
//var LogStream = fs.createWriteStream(__dirname + "/logger.log", {flags: 'w'});

var app = express();

// Генерация бд
//var DbScript = require("./model/DbScript")(mongoose);

app.set("views", __dirname + "/views");
app.set("view exgine", "jade");

app.use(favicon(__dirname + "/public/favicon.ico"));
app.use(logger("dev"));//, {stream: LogStream}));
app.use(static(__dirname + "/public"));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(methodOverride(function(req, res){
	if (req.body && typeof req.body == "object" && "_method" in req.body)
	{
		var method = req.body._method;
		delete req.body._method;
		return method;
	}
}));

app.use(cookieParser());
app.use(session({secret: 'mySecretKey', 
                 saveUninitialized: false,
                 resave: false,
                 //store: require('mongoose-session')(mongoose)
             }));

var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

var flash = require('connect-flash');
app.use(flash());

var initPassport = require('./passport/init');
initPassport(passport);

var routes = require("./routes/route")(passport);
app.use(routes);

app.get("/", function(req, res, next) {
  res.render("index.jade", {
    header: "Добро пожаловать!",
    text: "Это учебное-веб приложение, предназначенное для быстрой публикации объявлений.",
    user: req.user
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
var debug = require('./Debug')('ATables:app')

app.use(function(err, req, res, next) {
  debug(err);
  if (err.status){
    res.status(err.status);
    res.render('error.jade', {
      message: err.message,
      error: err
    });
  }
  else{
   res.status("400");
   res.render('error.jade', {
    message: "Bad request",
    error: "400! WTF!?"
  });
 } 
});
module.exports = app;	


