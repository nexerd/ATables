var AdModel = require("../model/AdsModel").AdModel;	
var TableModel = require("../model/TablesModel").TableModel;	
var UserModel = require("../model/UsersModel").UserModel;	

var debugDB = require('../Debug')('ATables:Mongoose:Tables')
var debugControlelr = require('../Debug')('ATables:Tables')

exports.show = function(req, res, next)
{	
	debugControlelr("Tables.show: ", req.params.Id);
	TableModel.findOne({_id: req.params.Id}, function(err, Table){
		if (err)
		{
			debugDB("Error:\n", err)
			return next(err);
		}
		else
		{	
			if (!Table)
			{
				debugDB("Table not found! Id: ", req.params.Id)			
				return next(createError(404, "Table with this id doesn't exist! :("));
			}
			debugDB("Success Table find", Table);
			if (req.user)
			{
				debugControlelr("Update user date of visits: ", req.user._id);
				var id = req.user._id;
				UserModel.findById({_id: id}, function(err, User){
					if (err)
					{
						debugDB("Error:\n", err)
						return next(err);
					}
					if (!User)
					{
						debugDB("User not found! Id: ", req.params.Id)			
						return next(createError(404, "User with this id doesn't exist! :("));
					}
					debugDB("Success User find", User);
					for (var i=0; i < User.Departments.length; i++)
					{
						if (Table._id.toString() == User.Departments[i].DocDepartment.TableId.toString())
						{		
							debugControlelr("User department found",  User.Departments[i]);
							User.Departments[i].LastOpened = new Date();
							debugControlelr("User department date update");
							User.save(function(err){
								if (err)
								{
									debugDB("Error:\n", err)
									return next(err);
								}
								debugDB("Success! user save");
							})
							break;
						}
					}
				});
			}

			AdModel.count({Table: Table._id }, function(err, count){
				if (err)
				{
					debugDB("Error:\n", err)
					return next(err);
				}
				else
				{	
					debugDB("Count of ads " + count);
					AdModel.find({Table: Table._id },function(err, Ads){
						if (err)
						{
							debugDB("Error:\n", err)
							return next(err);
						}
						else
						{
							debugDB("Success Ads find");
							debugControlelr("render tables/table.jade");
							res.render("tables/table.jade", 
							{
								title: "Ads Table",
								text: "Current department: ",
								Table: Table,
								Ads: Ads,
								user: req.user,
								next: count > 10											
							});

						}
					}).limit(10).sort({Date: -1});
				}					
			});			
		}
	});
}

exports.next = function(req, res, next)
{		
	debugControlelr("Tables.next: ", req.params.Id);
	AdModel.count({Table: req.params.Id }, function(err, count){
		if (err)
		{
			debugDB("Error:\n", err)
			return next(err);
		}
		else
		{
			debugDB("Count of ads " + count);
			AdModel.find({Table:  req.params.Id },function(err, Ads){
				if (err)
				{
					debugDB("Error:\n", err)
					return next(err);
				}
				else
				{
					debugDB("Success Ads find");
					debugControlelr("render tables/table.jade.");
					debugControlelr("skiped " + req.params.count);
					res.render("tables/next_ads.jade", 
					{
						Ads: Ads,
						user: req.user,
						next: count - req.params.count > 10				
					});

				}
			}).skip(parseInt(req.params.count)).limit(10).sort({Date: -1});
		}
	});
}