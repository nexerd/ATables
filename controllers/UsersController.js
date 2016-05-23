var UserModel = require("../model/UsersModel").UserModel;	
var DepartmentModel = require("../model/DepartmentsModel").DepartmentModel;	
var AdModel = require("../model/AdsModel").AdModel;	

var createError = require('http-errors');

var debugDB = require('../Debug')('ATables:Mongoose:Users');
var debugControlelr = require('../Debug')('ATables:Users');
var async = require('async');

exports.create = function (req, res, next) {
	debugControlelr("Users.create");
	res.render("users/create.jade")
};

exports.login = function(req, res, next){
	debugControlelr("Users.login");
	res.render("users/login.jade")
};

exports.account = function(req, res, next){
	debugControlelr("Users.account", req.user);
	res.render("users/account.jade", {user: req.user} );
};


exports.updateDepartment = function(req, res, next){
	debugControlelr("Users.updateDepartment", req.body.Id);
	DepartmentModel.findById(req.body.Id, function(err, Department)
	{
		if (err) 
		{
			debugDB("Error:\n", err)
			return next(err);
		}
		if (!Department)
		{
			debugDB("Department not found! Id: ", req.body.Id)			
			return next(createError(404, "Department with this id doesn't exist! :("));
		}
		debugControlelr("Success find department: ", Department);

		UserModel.findById({_id: req.user._id}, function(err, User) {
			if (err) 
			{
				debugDB("Error:\n", err)
				return next(err);
			}
			var key = true;
			if (!User)
			{
				debugDB("User not found! Id: ", req.user._id);			
				return next(createError(404, "User with this id doesn't exist! :("));
			}

			User.Departments.forEach(function(dep){
				if (dep.DocDepartment._id.toString() == Department._id.toString())
				{						
					key = false;
				}
			});
			if (!key)
			{
				debugControlelr("This department is allready added !");
				debugControlelr("Send /Users/account/");
				res.send("/Users/account/");
				return;
			}	
			debugControlelr("Add user's department");
			try{
				User.Departments.push({
					DocDepartment: Department,
					LastOpened: new Date()
				});
			}
			catch(err)
			{
				debugControlelr("Push Error: ", err);
				return next(err);
			}
			debugControlelr("Department added");
			User.save(function(err){
				if (err)
				{
					debugDB("Error:\n", err)
					return next(err);
				}
				debugDB("User saved");
				debugControlelr("Send /Users/account/");
				res.send("/Users/account/");
			})				
		}
		);
	});		
};

exports.deleteDepartment = function(req, res, next){
	debugControlelr("Users.deleteDepartment", req.body.Id);
	UserModel.findById({_id: req.user._id}, function(err, User) {		
		if (err) 
		{
			debugDB("Error:\n", err)
			return next(err);
		}
		if (!User)
		{
			debugDB("User not found! Id: ", req.user._id);			
			return next(createError(404, "User with this id doesn't exist! :("));
		}
		var pos = -1;
		for (var i=0; i<User.Departments.length; i++)
			if (req.body.Id.toString() == User.Departments[i].DocDepartment._id.toString())
			{
				pos = i;
				debugControlelr("Find department to delete " + i);
				break;
			}
		if (pos != -1)
		{
			try{
				User.Departments.splice(pos, 1);
			}
			catch(err){
				debugControlelr("Splice Error: ", err);
				return next(err);
			}
			debugControlelr("Department deleted");
			User.save(function(err){
			if (err)
			{
				debugDB("Error:\n", err)
				return next(err);
			}
			debugDB("User saved");
			debugControlelr("Send /Users/account/");
			res.send("/Users/account/");
			})	
		}
		else
			{
				debugControlelr("Department to delete not found");
				debugControlelr("Send /Users/account/");
				res.send("/Users/account/");
			}			
	});	
};

exports.departments = function(req, res, next){	
	debugControlelr("Users.departments", req.user);
	res.render("users/departments.jade", {user: req.user});
};

exports.hot = function(req, res, next){	
	debugControlelr("Users.hot", req.user);
	var Ads = [];

	function addLast(department, callback){
		debugControlelr("Find in: " + department._id);
		AdModel.find({ Table: department.DocDepartment.TableId, "Date": { $gt: department.LastOpened} },
		function(err , ads)	{
			if (err)
			{
				debugDB("Error:\n", err)
				return next(err);
			}
			if (ads) 
			{
				debugDB("Find ads:\n", ads)
				try{
					debugControlelr("Ads concat");
					Ads = Ads.concat(ads);
				}
				catch(err){
					debugControlelr("Concat Error: ", err);
					return next(err);
				}		
				debugControlelr("Success Ads concat");		
				callback();
			}				
		});
	}

	function updateVisitDate(){		
		debugControlelr("Update date: ");
		UserModel.findById({_id: req.user._id}, function(err, User){
			if (err)
			{
				debugDB("Error:\n", err)
				return next(err);
			}	
			debugDB("Success user find:\n", User)
			try{				
				User.Departments.forEach(function(department){
					department.LastOpened = new Date(); 
				});
			}
			catch(er){
				debugControlelr("forEach Error: ", err);
				return next(err);
			}
			debugControlelr("User's visit dates updated");
			req.user.Departments = User.Departments
			User.save(function(err){
				if (err)
				{
					debugDB("Error:\n", err)
					return next(err);
				}
				debugDB("User save")
				debugControlelr("render hots");	
				res.render("users/hot.jade", {user: req.user, Ads: Ads} );
			});
		});	
	}
	async.map(req.user.Departments, addLast,  updateVisitDate);
};