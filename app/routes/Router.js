exports.mapRoute = function(app, prefix)
{	
	var prefixObj = require("../controllers/" + prefix + "/controller");	
	app.get("/" + prefix + "/:Id/" , prefixObj.show);
	app.get("/" + prefix + "/create/:Id/" , prefixObj.create);
	app.post("/" + prefix + "/new/:Id/" , prefixObj.new);
	//app.get("/" + prefix + "/:Type" + "/:Name", prefixObj.show);
}