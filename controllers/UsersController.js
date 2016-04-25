var UserModel = require("../model/UsersModel").UserModel;	

exports.create = function (req, res, next) {
	res.render("users/create.jade")
};

exports.login = function(req, res, next){
	res.render("users/login.jade")
};

exports.show = function(req, res, next){
	res.send("Добро пожаловать " + req.params.Id);
};