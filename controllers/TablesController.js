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
						Ads: Ads						
					});

				}
			}).limit(10).sort({Date: -1});
		}
	});
}