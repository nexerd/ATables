var UserModel = require("../model/UsersModel").UserModel;	
var DepartmentModel = require("../model/DepartmentsModel").DepartmentModel;	

exports.create = function (req, res, next) {
	res.render("users/create.jade")
};

exports.login = function(req, res, next){
	res.render("users/login.jade")
};

exports.account = function(req, res, next){
	res.render("users/account.jade", {user: req.user} );
};

exports.show = function(req, res, next){
	console.log("Заглушка");
};

exports.updateDepartment = function(req, res, next){

	DepartmentModel.findById(req.body.Id, function(err, Department)
	{
		if (err) 
			throw err; 
		UserModel.findById({_id: req.user._id}, function(err, User) {
			if (err) 
				throw err; 
			var key = true;
			User.Departments.forEach(function(dep){
				if (dep.Id.toString() == Department._id.toString())
				{						
					key = false;
				}
			});
			if (!key)
			{
				res.send("/Users/account/");
				return;
			}	
			User.Departments.push({
				Type: Department.Type,
				Name: Department.Name,
				Id: Department._id
			});
			User.save(function(err){
				if (err)
				{
					console.log(err);
					throw err;
				}
				else
					res.send("/Users/account/");
			})				
		}
		);
	});		
};

exports.deleteDepartment = function(req, res, next){
	UserModel.findById({_id: req.user._id}, function(err, User) {
		if (err) 
			throw err; 
		var pos = -1;
		for (var i=0; i<User.Departments.length; i++)
			if (req.body.Id.toString() == User.Departments[i].Id.toString())
			{
				pos = i;
				break;
			}
		if (pos != -1)
		{
			console.log(pos);
			User.Departments.splice(pos, 1);
			User.save(function(err){
			if (err)
			{
				console.log(err);
				throw err;
			}
			else
				res.send("/Users/account/");
			})	
		}
		else
			res.send("/Users/account/");					
	});	
};