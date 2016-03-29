var http = require("http");
var express = require("express");
var logger = require("morgan");
var favicon = require("serve-favicon");
var static = require("serve-static");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var fs = require("fs");

//var LogStream = fs.createWriteStream(__dirname + "/logger.log", {flags: 'w'});

var app = express();
var Router = require("./routes/Router");
var CommandInvoker = require("./model/CommandInvoker");
var types = ["Departments", "Ads", "Tables"];



app.set("port", process.env.PORT || 8000)
app.set("views", __dirname + "/views");
app.set("view exgine", "jade");

app.use(favicon(__dirname + "/public/favicon.ico"));
app.use(logger("dev"));//, {stream: LogStream}));
app.use(static(__dirname + "/public"));
app.use(bodyParser());
app.use(methodOverride());

types.forEach(CommandInvoker.addInvoker);
types.forEach(function(prefix) { Router.mapRoute(app, prefix) });

app.get("/", function(req, res) {
	var CFabric = require("./controllers/commandFabric");
	var Invoker = require("./model/CommandInvoker");
	var command = CFabric.commandFabric("Departments", "Read", { Type: "Факультет"});
	var invokeAns = Invoker.invoke(command);		
	invokeAns.on("success", function(ans){		
		res.render("index.jade", 
			{
				title: "Ads Table",
				text: "Hello World!",
				Faculties: ans
			});
	});
	
	});


app.use(function(req, res, next){
		throw new Error(req.url + " not found :(");
	});
app.use(function(err, req, res, next){
		console.log(err);
		res.send(err);
	});



	

http.createServer(app).listen(app.get("port"), function()
	{
		console.log("Express server listening on port " + app.get("port"));
	});




