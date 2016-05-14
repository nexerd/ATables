var DepartmentModel = require("../model/DepartmentsModel").DepartmentModel;	

var createError = require('http-errors');

var debugDB = require('../Debug')('ATables:Mongoose:Departments');
var debugControlelr = require('../Debug')('ATables:Departments');

exports.show = function(req, res, next)
{	
	debugControlelr("Departments.show: ", req.params.Id);
	DepartmentModel.findById(req.params.Id, function(err, Department){
		if (err)
		{
			debugDB("Error:\n", err)
			return next(err);
		}	
		if (!Department)	
		{
			debugDB("Department not found! Id: ", req.params.Id)			
			return next(createError(404, "Department with this id doesn't exist! :("));
		}
		debugDB("Success BaseDepartment find", Department);
		DepartmentModel.find({BaseDepartment: Department._id}, function(err, SubDepartments){
			if (err)
			{
				debugDB("Error:\n", err)
				return next(err);
			}
			debugDB("Success SubDepartments find", SubDepartments);
			debugControlelr("render departments/department.jade");
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
	debugControlelr("Departments.main");
	DepartmentModel.findOne({Type: "Университет"}, function(err, Department)
	{
		if (err)
		{
			debugDB("Error:\n", err)
			return next(err);
		}
		if (!Department)	
		{
			debugDB("Department not found! Id: ", req.params.Id)			
			return next(createError(404, "Department with this id doesn't exist! :("));
		}
		debugDB("Success BaseDepartment find", Department);
		DepartmentModel.find({BaseDepartment: Department._id}, function(err, SubDepartments){
			if (err)
			{
				debugDB("Error:\n", err)
				return next(err);
			}
			debugDB("Success SubDepartments find", SubDepartments);
			debugControlelr("render departments/department.jade");
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

exports.mainSelect = function(req, res, next){
	debugControlelr("Departments.mainSelect");
	DepartmentModel.findOne({Type: "Университет"}, function(err, Department)
	{
		if (err)
		{
			debugDB("Error:\n", err)
			return next(err);
		}
		if (!Department)	
		{
			debugDB("Department not found! Id: ", req.params.Id)			
			return next(createError(404, "Department with this id doesn't exist! :("));
		}
		debugDB("Success Department find", Department);
		debugControlelr("send ", Department);
		res.send(Department);
	});	
};

exports.showSelect = function(req, res, next){
	debugControlelr("Departments.showSelect: ", req.params.Id);
	DepartmentModel.find({BaseDepartment: req.params.Id}, function(err, SubDepartments){
		if (err)
		{
			debugDB("Error:\n", err)
			return next(err);
		}
		debugDB("Success SubDepartments find", SubDepartments);
		debugControlelr("send departments/select.jade");
		res.render("departments/select.jade", 
		{
			Departments: SubDepartments					
		});
	});
};