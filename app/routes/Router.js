exports.mapRoute = function(app, prefix)
{	
	var prefixObj = require("../controllers/" + prefix + "/controller");	
	app.get("/" + prefix + "/:Id/" , prefixObj.show);
	//app.get("/" + prefix + "/:Type" + "/:Name", prefixObj.show);
}