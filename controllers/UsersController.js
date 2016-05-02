var UserModel = require("../model/UsersModel").UserModel;	
var DepartmentModel = require("../model/DepartmentsModel").DepartmentModel;	
var AdModel = require("../model/AdsModel").AdModel;	

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
				Table: Department.TableId,
				Name: Department.Name,
				Id: Department._id,
				LastOpened: new Date()
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

exports.departments = function(req, res, next){	
	res.render("users/departments.jade", {user: req.user});
};

exports.hot = function(req, res, next){
	var Ads = [];

	req.user.Departments.forEach(function(department){
		AdModel.find({ Table: department.Table, "Date": { $gt: department.LastOpened} },
		function(err , ads)	{
			if (err)
				throw err;
			if (ads)
				Ads = Ads.concat(ads);				
		});
	});
	
	UserModel.findById({_id: req.user._id}, function(err, User){
		if (err)
				throw err;
		var departments = User.Departments;							
		departments.forEach(function(dep){dep.LastOpened = new Date(); });
		departments.push(0);
		departments.pop();
		req.user.Departments = departments;
		User.Departments = departments;
		User.save(function(err){
			if (err)
				throw err;
			setTimeout(function(){ res.render("users/hot.jade", {user: req.user, Ads: Ads} ); }, 2000);	
		});
	});	
};