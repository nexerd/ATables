var CFabric = require("../commandFabric");
var Invoker = require("../../model/CommandInvoker")

exports.show = function(req, res, next)
{	
	var command = CFabric.commandFabric("Ads", "Read", { Date: new Date(2016, 3, 2)});
	var invokeAns = Invoker.invoke(command);	
	invokeAns.on("error", function(err){
		console.log("Error:\n");
		console.log(err);
	});
	invokeAns.on("success", function(ans){
		//console.log(ans);
		res.set("Conctent-Type", "text/html");
		res.send(ans);
	});
}

exports.new = function(req, res, next)
{
	var _ad = {};
	_ad.Table = req.params.Id
	_ad.Name = req.body.Name;
	_ad.Text = req.body.Text;
	_ad.Tag = req.body.Tag;
	_ad.Date = new Date();
	var command = CFabric.commandFabric("Ads", "Write", _ad );
	var invokeAns = Invoker.invoke(command);
	invokeAns.on("error", function(err){
		console.log("Error:\n");
		console.log(err);
	});
	invokeAns.on("success", function(ans){
		//console.log(ans);
		res.redirect("/Tables/" + _ad.Table);
	});
}

exports.create = function(req, res, next)
{
	res.render("ads/ad_create.jade", { _tableId: req.params.Id })
}