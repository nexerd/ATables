var AdModel = require("../model/AdsModel").AdModel;	

var createError = require('http-errors');

var debugDB = require('../Debug')('ATables:Mongoose:Ads');
var debugControlelr = require('../Debug')('ATables:Ads');

exports.show = function(req, res, next)
{		
	debugControlelr("Ads.show: ", req.params.Id);
	AdModel.findById( { _id: req.params.Id }, function(err, Ad){
		if (err) 
		{
			debugDB("Error:\n", err)
			return next(err);
		}
		if (Ad)
		{
			debugDB("Secces! Ad:\n", Ad)
			res.render("ads/ad.jade", {
				Ad: Ad,
				user: req.user 
			});
		}
		else
		{
			debugDB("Ad not found! Id: ", req.params.Id)			
			return next(createError(404, "Ad with this id doesn't exist! :("));
		}		
	});
}

exports.new = function(req, res, next)
{
	debugControlelr("Ads.new: ", req.body);
	debugControlelr("in table: ", req.params.Id);
	debugControlelr("by user: ",req.user);
	var Ad = new AdModel({
		Table: req.params.Id,
		Name: req.body.Name,
		Text:req.body.Text,
		Tag: req.body.Tag,
		//Date: new Date(),
		User: {
			Id: req.user._id,
			Name: req.user.UserName
		}
	});
	Ad.save(function(err){
		if (err)
		{
			debugDB("Error:\n", err)
			return next(err);
		}	
		debugDB("Secces! New Ad created:");
		debugControlelr("Redirect to url: /Tables/" + Ad.Table);
		res.redirect("/Tables/" + Ad.Table);
	});
}

exports.create = function(req, res, next)
{
	debugControlelr("Ads.create in table: ", req.params.Id);
	res.render("ads/ad_create.jade", { _tableId: req.params.Id })
}

exports.update = function(req, res, next)
{	
	debugControlelr("Ads.update: ", req.body);
	debugControlelr("with id: ", req.params.Id);
	var update;
	if (req.body.commentText)
	{
		debugControlelr("add comment ", req.body.commentText);
		debugControlelr("by user: ",req.user);
		update = {
			$push: 
			{ 
				Comments: {
					Text: req.body.commentText,
					//Data: new Date(),
					User: {
						Id: req.user._id,
						Name: req.user.UserName
					}
				}
			} 
		};
	}
	else
	{
		if (!req.body.AdText)
		{
			debugControlelr("Error! Bad request :( Neither new comment, nor new text! ");
			return next(createError(400));
		}
		debugControlelr("update ad's text ", req.body.AdText);
		update = {
			Text: req.body.AdText
		}
	}
	AdModel.update({ _id: req.params.Id }, update,	function(err) {
		if (err)
		{
			debugDB("Error:\n", err)
			return next(err);
		}
		debugDB("Secces! Ad updated:");
		debugControlelr("Redirect to url: /Ads/" + req.params.Id);
		res.send("/Ads/" + req.params.Id);
	});
}

exports.delete = function(req, res, next){
	debugControlelr("Ads.delete: ", req.params.Id)
	AdModel.findOneAndRemove({ _id: req.params.Id}, function(err, Ad)
	{
		if (err){
			debugDB("Error:\n", err)
			return next(err);
		}
		else
		{
			debugDB("Secces delete Ad: ", req.params.Id);
			debugControlelr("Redirect to url: /Tables/" + Ad.Table);
			res.send("/Tables/" + Ad.Table);
		}
	});	
};

exports.deleteComment = function(req, res, next){
	debugControlelr("Ads.deleteComment: ", req.params.Id)
	AdModel.findOne({_id: req.params.Id}, function(err, Ad){
		if (err)
		{
			debugDB("Error:\n", err)
			return next(err);
		}
		else
		{
			if (!Ad)
			{
				debugDB("Ad not found! Id: ", req.params.Id)			
				return next(createError(404, "Ad with this id doesn't exist! :("));
			}

			debugDB("Secces find Ad: ", Ad);
			debugControlelr("Removed comment: ", Ad.Comments[req.params.number]);
			try{
				Ad.Comments.splice(req.params.number, 1);	
			}	
			catch(err)
			{
				debugControlelr("Removed Error: ", err);
				return next(err);
			}
			debugControlelr("After splice: ", Ad.Comments);	
			Ad.save(function(err){
				if (err)
				{
					debugDB("Error:\n", err)
					return next(err);
				}		
				else
				{
					debugDB("Secces! Ad saved:");
					debugControlelr("Redirect to url: /Ads/" + Ad._id);
					res.send("/Ads/" + Ad._id);
				}
			});
		}
	});	
};

exports.updateComment = function(req, res, next){
	debugControlelr("Ads.updateComment: ", req.params.Id);
	debugControlelr("with number: ", req.params.number);
	debugControlelr("to text: ", req.body.CommentText);
	var num = req.params.number;
	AdModel.findOne({_id: req.params.Id}, function(err, Ad){
		if (err)
		{
			debugDB("Error:\n", err)
			return next(err);
		}
		else
		{
			if (!Ad)
			{
				debugDB("Ad not found! Id: ", req.params.Id)			
				return next(createError(404, "Ad with this id doesn't exist! :("));
			}
			
			debugDB("Secces! Ad found: ", Ad);
			debugControlelr("Update text to comment: ", req.params.number);			
			try{
				Ad.Comments[num].Text = req.body.CommentText;
			}
			catch(err){
				debugControlelr("Update Error: ", err);
				return next(err);
			}
			debugControlelr("Text updated: ", Ad.Comments[num].Text);
			Ad.save(function(err){
				if (err)
				{	
					debugDB("Error:\n", err)
					return next(err);
				}
				debugDB("Secces! Ad saved:");
				debugControlelr("Redirect to url: /Ads/" + Ad._id);
				res.send("/Ads/" + Ad._id);
			});
		}
	});	
};

exports.find = function(req ,res, next){
	debugControlelr("Ads.find");
	res.render("ads/ad_find.jade");
};

exports.result = function(req ,res, next){
	debugControlelr("Ads.result");
	var query = req.query;
	debugControlelr(query);

	var select = {};

	if (query.text){
		if (query.Text){
			select.Text = query.text;
		}
		if (query.Header) {
			select.Name = query.text;
		}
		if (query.Comment) {
			select.Comments = { $elemMatch: { Text: query.text }};
		}
	}
	if (query.from){
		select.Date = {$gt: query.from}
	}
	if (query.to){
		if (select.Date){
			select.Date.$lt = query.to;
		}
		else{
			select.Date = {$lt: query.from}
		}
	}
	debugControlelr(select);
	AdModel.find(select, function(err, Ads){
		if (err)
		{	
			debugDB("Error:\n", err)
			return next(err);
		}
		debugDB("Secces! Ads find" +  Ads.length);
		debugControlelr("renerd ads/ad_result.jade");
		res.render("ads/ad_result.jade", { Ads: Ads, user: req.user });
	});
};