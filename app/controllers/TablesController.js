var TableModel = require("../model/TablesModel").TableModel;	
var AdModel = require("../model/AdsModel").AdModel;	
var mongoose = require("../model/mongooseConnect")
exports.show = function(req, res, next)
{		
	mongoose.connect();
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

exports.new = function(req, res, next) {}
exports.create = function(req, res, next) {}
exports.update = function(req, res, next) {}