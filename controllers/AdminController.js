var AdminModel = require("../model/AdminModel").AdminModel;	
var UserModel = require("../model/UsersModel").UserModel;	
var DepartmentModel = require("../model/DepartmentsModel").DepartmentModel;	
var AdModel = require("../model/AdsModel").AdModel;	
	
var createError = require('http-errors');

var debugDB = require('../Debug')('ATables:Mongoose:Admin')
var debugControlelr = require('../Debug')('ATables:Admin')

exports.rootup = function(req, res, next) {
	debugControlelr("Admin.rootup");
	res.render("admin/rootup.jade")	
}

exports.rootin = function(req, res, next) {
	debugControlelr("Admin.rootin");
	res.render("admin/rootin.jade")	
}

exports.root = function(req, res, next) {
	debugControlelr("Admin.root");
	res.render("admin/root.jade", {admin: req.user})	
}

exports.root = function(req, res, next) {
	debugControlelr("Admin.root");
	res.render("admin/root.jade", {admin: req.user})	
}

exports.users = function(req, res, next) {
	debugControlelr("Admin.users");
	UserModel.find(function(err, users){
		if (err){
			debugDB("Error:\n", err);
			return next(err);
		}
		debugDB("Success find users!");
		res.render("admin/users.jade", { admin: req.user, Users: users})	
	}).sort({ Date: - 1 });	
}

exports.departments = function(req, res, next) {
	debugControlelr("Admin.departments");
	DepartmentModel.find(function(err, departments){
		if (err){
			debugDB("Error:\n", err);
			return next(err);
		}
		debugDB("Success find departments!");
		res.render("admin/departments.jade", { admin: req.user, Departments: departments})	
	});	
}

exports.ads = function(req, res, next) {
	debugControlelr("Admin.ads");
	var num = req.params.count ? parseInt(req.params.count) : 0;
	AdModel.find(function(err, ads){
		if (err){
			debugDB("Error:\n", err);
			return next(err);
		}
		debugDB("Success find ads!");
		res.render("admin/ads.jade", { admin: req.user, Ads: ads, num: num})	
	}).skip(num).limit(10).sort({ Date: - 1 });		
}

exports.adsDelete = function(req, res, next) {
	debugControlelr("Admin.adsDelete");
	AdModel.findOneAndRemove({ _id: req.body.Id}, function(err, Ad)
	{
		if (err){
			debugDB("Error:\n", err)
			return next(err);
		}
		else
		{
			if (!Ad){
				debugControlelr("Can not delete ad with id " + req.body.Id);
				return next(createError(404, "Ad with this id doesn't exist! :("));
			}
			debugDB("Secces delete Ad: ", Ad);
			debugControlelr("Redirect to url: /Admin/ads/");
			res.send("/Admin/ads/");
		}
	});
}

exports.usersDelete = function(req, res, next) {
	debugControlelr("Admin.usersDelete");
	UserModel.findOneAndRemove({ _id: req.body.Id}, function(err, User)
	{
		if (err){
			debugDB("Error:\n", err)
			return next(err);
		}
		else
		{
			if (!User){
				debugControlelr("Can not delete user with id " + req.body.Id);
				return next(createError(404, "User with this id doesn't exist! :("));
			}
			debugDB("Secces delete User: ", User);
			debugControlelr("Redirect to url: /Admin/users/");
			res.send("/Admin/users/");
		}
	});
}

exports.departmentsDelete = function(req, res, next) {
	debugControlelr("Admin.departmentsDelete");
	DepartmentModel.findOneAndRemove({ _id: req.body.Id}, function(err, Department)
	{
		if (err){
			debugDB("Error:\n", err)
			return next(err);
		}
		else
		{
			if (!Department){
				debugControlelr("Can not delete department with id " + req.body.Id);
				return next(createError(404, "Department with this id doesn't exist! :("));
			}
			debugDB("Secces delete Department: ", Department);
			debugControlelr("Redirect to url: /Admin/departments/");
			res.send("/Admin/departments/");
		}
	});
}