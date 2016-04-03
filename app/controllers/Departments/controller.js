var CFabric = require("../commandFabric");
var Invoker = require("../../model/CommandInvoker")


var DepartmentModel = require("../../model/DepartmentsModel").DepartmentModel;	


exports.show = function(req, res, next)
{
	var mongoose = require("../../model/mongooseConnect").connect();	
	console.log("qq");
	DepartmentModel.findById(req.params.Id, function(err, Department){
		if (err)
		{
			console.log(err);
			throw err;
		}
		console.log(Department);
		DepartmentModel.find({BaseDepartment: Department._id}, function(err, SubDepartments){
			if (err)
			{
				console.log(err);
				throw err;
			}
			console.log(SubDepartments);
			res.render("departments/department.jade", 
					{
						"title": "Ads Table",
						"text": "Current department: ",
						"BaseDepartment": Department,
						"SubDepartments": SubDepartments
					});
		});

	});
}

exports.new = function(req, res, next) {}
exports.create = function(req, res, next) {}
exports.update = function(req, res, next) {}