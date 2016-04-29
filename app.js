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
var mongoose = require("./model/mongooseConnect")	
var config = require("./config");

var fs = require("fs");

//var LogStream = fs.createWriteStream(__dirname + "/logger.log", {flags: 'w'});

var app = express();

// Генерация бд
var DbScript = require("./model/DbScript")(mongoose);

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
var MongoDBStore = require('connect-mongodb-session')(session);
var SessionStore = new MongoDBStore(
      { 
        uri: process.env.OPENSHIFT_MONGODB_DB_URL ?
	 process.env.OPENSHIFT_MONGODB_DB_URL + 'ATableTest0' :
	 		'mongodb://localhost:27017/ATableTest0' ,
        collection: 'mySessions'
      });

app.use(session({secret: 'mySecretKey', 
                 saveUninitialized: true,
                 resave: true,
                 store: SessionStore
             }));

var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

var flash = require('connect-flash');
app.use(flash());

var initPassport = require('./passport/init');
initPassport(passport);

var routes = require("./routes/route")(passport);
app.use('/', routes);

app.get("/", function(req, res) {
	var DepartmentModel = require("./model/DepartmentsModel").DepartmentModel;	
	DepartmentModel.findOne({Type: "Университет"}, function(err, Department)
	{
		if (err)
			throw err;
		DepartmentModel.find({BaseDepartment: Department._id}, function(err, SubDepartments){
			if (err)
				throw err;
			res.render("index.jade", 
				{
					title: "Ads Table",
					text: Department.Name,
					Faculties: SubDepartments,
					user: req.user
				});
		});
	});	
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
  	console.log("error.jade");
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error.jade', {
    message: err.message,
    error: {}
  });
});

module.exports = app;	


