var AdModel = require("../model/AdsModel").AdModel;		

exports.show = function(req, res, next)
{		
	AdModel.findById( { _id: req.params.Id }, function(err, Ad){
		if (err) 
		{
			throw err;
		}
		res.render("ads/ad.jade", {
			Ad: Ad,
			user: req.user 
		});
	});
}

exports.new = function(req, res, next)
{
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
			throw err;
		}		
		res.redirect("/Tables/" + Ad.Table);
	});
}

exports.create = function(req, res, next)
{
	res.render("ads/ad_create.jade", { _tableId: req.params.Id })
}

exports.update = function(req, res, next)
{	
	var update;
	if (req.body.commentText)
	{
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
			throw "Полохой запрос на обновление текст объявлния";
		update = {
			Text: req.body.AdText
		}
	}
	AdModel.update({ _id: req.params.Id }, update,	function(err) {
		if (err)
			throw err;
		console.log(req.body);
		res.send("/Ads/" + req.params.Id);
	}
	);
}

exports.delete = function(req, res, next){

	AdModel.findOneAndRemove({ _id: req.params.Id}, function(err, Ad)
	{
		if (err){
			throw err
		}
		else
		{
			console.log("Secces delete ad " + req.params.Id);
			res.send("/Tables/" + Ad.Table);
		}
	});	
};

exports.deleteComment = function(req, res, next){
	AdModel.findOne({_id: req.params.Id}, function(err, Ad){
		if (err){
			throw err
		}
		else
		{
			Ad.Comments.splice(req.params.number, 1);			
			Ad.save(function(err){
				if (err)
				{
					throw err;
				}		
				else
				{
					res.send("/Ads/" + Ad._id);
				}
			});
		}
	});	
};

exports.updateComment = function(req, res, next){
	var Comments;
	var num = req.params.number;
	AdModel.findOne({_id: req.params.Id}, function(err, Ad){
		if (err){
			throw err
		}
		else
		{
			Ad.Comments[num].Text = req.body.CommentText;
			Ad.save(function(err){
				if (err)
					throw err;
				res.send("/Ads/" + Ad._id);
			});
		}
	});
	
};