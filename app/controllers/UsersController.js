var UserModel = require("../model/UsersModel").UserModel;	

exports.create = function (req, res, next) {
	res.render("users/create.jade")
};

exports.new = function(req, res, next){

	var User = new UserModel({
		UserName: req.body.Name,
		password: parseInt(req.body.Password, 10)
	});
	User.save(function(err){
		if (err)
		{
			throw err;
		}		
		else
		{
			console.log("Регистрация завершена!");
			res.redirect("/Users/login/");
		}
	});
};

exports.login = function(req, res, next){
	res.render("users/login.jade")
};

exports.enter = function(req, res, next){
	UserModel.findOne({ UserName: req.body.Name}, function(err, user){
		if (err)
		{
			console.log("Error:\n");
			console.log(err);
		}
		else
		{			
			if (user.checkPassword(req.body.Password))
			{
				res.redirect("/Users/" + user._id);
			}
			else
			{
				console.log("Не верный пароль:(");
			}
		}
	});
};

exports.show = function(req, res, next){
	res.send("Добро пожаловать " + req.params.Id);
};