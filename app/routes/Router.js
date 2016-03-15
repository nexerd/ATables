exports.mapRoute = function(app, commandController)//, prefix)
{
	//prefix = '/' + prefix;
	//var prefixObj = require("./controllers/" + prefix);

	var ComandControllers = require("../controllers/ComandControllers");

	app.get("/main", function(req, res, next) {
		var command = new ComandControllers.createCommand(
			"R", 
			"Departments", 
			{
				Type: "Факультет",
				Name: "ЭМФ"
			});
		commandController.PushCommand(command);
	});
}