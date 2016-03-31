var CFabric = require("../commandFabric");
var Invoker = require("../../model/CommandInvoker")

exports.show = function(req, res, next)
{
	var command = CFabric.commandFabric("Tables", "Read", { Id: req.params.Id } );
	var invokeAns = Invoker.invoke(command);	
	invokeAns.on("error", function(err){
		console.log("Error:\n");
		console.log(err);
	});
	invokeAns.on("success", function(Table){		
		var command = CFabric.commandFabric("Ads", "Read", { Table: Table._id}); 
		var invokeAns = Invoker.invoke(command);
		invokeAns.on("error", function(err){
			console.log("Error:\n");
			console.log(err);
		});
		invokeAns.on("success", function(Ads){
			res.render("tables/tables.jade", 
					{
						title: "Ads Table",
						text: "Current department: ",
						Table: Table,
						Ads: Ads
					});
		});
	});
}

exports.new = function(req, res, next) {}
exports.create = function(req, res, next) {}