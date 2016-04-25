var AdModel = require("../model/AdsModel").AdModel;		

exports.show = function(req, res, next)
{		
	AdModel.findById( { _id: req.params.Id }, function(err, Ad){
		if (err)
			throw err;
		res.render("ads/ad.jade", {	Ad: Ad });
	});
}

exports.new = function(req, res, next)
{
	var Ad = new AdModel({
	Table: req.params.Id,
	Name: req.body.Name,
	Text:req.body.Text,
	Tag: req.body.Tag,
	Date: new Date(),
	User: {
		Id: req.user._id,
		Name: req.user.UserName
	}
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
	AdModel.update({ _id: req.params.Id },
	 { $push: 
	 	{ 
	 		Comments: {
	 			Text: req.body.commentText,
	 			Data: new Date(),
	 			User: {
	 				Id: req.user._id,
	 				Name: req.user.UserName
	 			}
	 		}
	 	} 
	 },
		function(err)
		{
			if (err)
				throw err;
			res.redirect("/Ads/" + req.params.Id);
		});
}