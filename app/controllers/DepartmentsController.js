var DepartmentModel = require("../model/DepartmentsModel").DepartmentModel;	
var mongoose = require("../model/mongooseConnect")

exports.show = function(req, res, next)
{
	mongoose.connect();	
	DepartmentModel.findById(req.params.Id, function(err, Department){
		if (err)
		{
			console.log(err);
			throw err;
		}		
		DepartmentModel.find({BaseDepartment: Department._id}, function(err, SubDepartments){
			if (err)
			{
				console.log(err);
				throw err;
			}
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