var DepartmentModel = require("../model/DepartmentsModel").DepartmentModel;	

exports.show = function(req, res, next)
{	
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