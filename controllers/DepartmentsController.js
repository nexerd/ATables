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
						title: "Ads Table",
						text: "Current department: ",
						BaseDepartment: Department,
						SubDepartments: SubDepartments,
						user: req.user						
					});
		});

	});
};

exports.main = function(req, res, next){
	DepartmentModel.findOne({Type: "Университет"}, function(err, Department)
	{
		if (err)
			throw err;
		DepartmentModel.find({BaseDepartment: Department._id}, function(err, SubDepartments){
			if (err)
				throw err;
			res.render("departments/department.jade", 
				{
					title: "Ads Table",
					text: "Просмотр подразделений: ",
					BaseDepartment: Department,
					SubDepartments: SubDepartments,
					user: req.user	
				});
		});
	});	
};
