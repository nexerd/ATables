	
var TableModel = require("../../model/TablesModel").TableModel;	
var AdModel = require("../../model/AdsModel").AdModel;	

exports.show = function(req, res, next)
{		
	var mongoose = require("../../model/mongooseConnect").connect();
	TableModel.findOne({_id: req.params.Id}, function(err, Table){
		if (err)
		{
			console.log("Error:\n");
			console.log(err);
		}
		else
		{	
			console.log(Table);
			AdModel.find({Table: Table._id },function(err, Ads){
				if (err)
				{
					console.log("Error:\n");
					console.log(err);
				}
				else
				{
					console.log(Ads);
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