var CFabric = require("../commandFabric");
var Invoker = require("../../model/CommandInvoker")

exports.show = function(req, res, next)
{
	var command = CFabric.commandFabric("Departments", "Read", { Name: req.params.Name});
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