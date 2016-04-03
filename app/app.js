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

// Генерация бд
//var DbScript = require("./model/DbScript");

app.set("port", process.env.PORT || 8000)
app.set("views", __dirname + "/views");
app.set("view exgine", "jade");

app.use(favicon(__dirname + "/public/favicon.ico"));
app.use(logger("dev"));//, {stream: LogStream}));
app.use(static(__dirname + "/public"));
app.use(bodyParser());
app.use(methodOverride(function(req, res){
	if (req.body && typeof req.body == "object" && "_method" in req.body)
	{
		var method = req.body._method;
		delete req.body._method;
		return method;
	}
}));

Router.mapRoute(app);

app.get("/", function(req, res) {
	var DepartmentModel = require("./model/DepartmentsModel").DepartmentModel;	
	var mongoose = require("./model/mongooseConnect")
	mongoose.connect();	

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
					Faculties: SubDepartments
				});
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




