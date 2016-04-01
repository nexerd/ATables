var CFabric = require("../commandFabric");
var Invoker = require("../../model/CommandInvoker")

exports.show = function(req, res, next)
{
	var DbConnect = require("../../model/DbConnector");	
	DbConnect.Connect();
	var TableModel = require("../../model/TablesModel").TableModel;	
	TableModel.findOne({_id: req.params.Id}, function(err, Table){
		if (err)
		{
			console.log("Error:\n");
			console.log(err);
		}
		else
		{
			var AdModel = require("../../model/AdsModel").AdModel;		
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

exports.new = function(req, res, next) {}
exports.create = function(req, res, next) {}
exports.update = function(req, res, next) {}