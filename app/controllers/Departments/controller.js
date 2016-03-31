var CFabric = require("../commandFabric");
var Invoker = require("../../model/CommandInvoker")

exports.show = function(req, res, next)
{
	var command = CFabric.commandFabric("Departments", "Read", { Id: req.params.Id } );
	var invokeAns = Invoker.invoke(command);	
	invokeAns.on("error", function(err){
		console.log("Error:\n");
		console.log(err);
	});
	invokeAns.on("success", function(Departments){
		//console.log(ans);
		var BaseDepartment = Departments[0];
		var command = CFabric.commandFabric("Departments", "Read", { BaseDepartment: BaseDepartment._id}); 
		var invokeAns = Invoker.invoke(command);
		invokeAns.on("error", function(err){
			console.log("Error:\n");
			console.log(err);
		});
		invokeAns.on("success", function(Departments){
			res.render("departments/department.jade", 
					{
						title: "Ads Table",
						text: "Current department: ",
						BaseDepartment: BaseDepartment,
						SubDepartments: Departments
					});
		});
	});
}

exports.new = function(req, res, next) {}
exports.create = function(req, res, next) {}
exports.update = function(req, res, next) {}