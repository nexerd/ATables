var AdModel = require("../model/AdsModel").AdModel;	
var TableModel = require("../model/TablesModel").TableModel;	

exports.show = function(req, res, next)
{	
	TableModel.findOne({_id: req.params.Id}, function(err, Table){
		if (err)
		{
			console.log("Error:\n");
			console.log(err);
		}
		else
		{	
			AdModel.count({Table: Table._id }, function(err, count){
				if (err)
				{
					console.log("Error:\n");
					console.log(err);
				}
				else
				{
					AdModel.find({Table: Table._id },function(err, Ads){
						if (err)
						{
							console.log("Error:\n");
							console.log(err);
						}
						else
						{
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
	AdModel.count({Table: req.params.Id }, function(err, count){
		if (err)
		{
			console.log("Error:\n");
			console.log(err);
		}
		else
		{
			AdModel.find({Table:  req.params.Id },function(err, Ads){
				if (err)
				{
					console.log("Error:\n");
					console.log(err);
				}
				else
				{
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