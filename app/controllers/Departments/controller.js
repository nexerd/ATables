var CFabric = require("../commandFabric");
var Invoker = require("../../model/CommandInvoker")

exports.show = function(req, res, next)
{
	var command = CFabric.commandFabric("Departments", "Read", { Name: "ЭМФ"});
	var invokeAns = Invoker.invoke(command);	
	invokeAns.on("error", function(err){
		console.log("Error:\n");
		console.log(err);
	});
	invokeAns.on("success", function(ans){
		console.log(ans);
	});
}