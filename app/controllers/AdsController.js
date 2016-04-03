var AdModel = require("../model/AdsModel").AdModel;	
var mongoose = require("../model/mongooseConnect")

exports.show = function(req, res, next)
{	
	var db = mongoose.connection;
	AdModel.findById( { _id: req.params.Id }, function(err, Ad){
		if (err)
			throw err;
		res.render("ads/ad.jade", {	Ad: Ad });
	});
}

exports.new = function(req, res, next)
{
	var db = mongoose.connection;
	var Ad = new AdModel({
	Table: req.params.Id,
	Name: req.body.Name,
	Text:req.body.Text,
	Tag: req.body.Tag,
	Date: new Date()
	});
	Ad.save(function(err){
		if (err)
		{
			throw err;
		}		
		else
		{
			res.redirect("/Tables/" + Ad.Table);
		}
	});
}

exports.create = function(req, res, next)
{
	res.render("ads/ad_create.jade", { _tableId: req.params.Id })
}

exports.update = function(req, res, next)
{
	var db = mongoose.connection;
	AdModel.update({ _id: req.params.Id }, {$push: { Comments: req.body.commentText} },
		function(err)
		{
			if (err)
				throw err;
			res.redirect("/Ads/" + req.params.Id);
		});
}