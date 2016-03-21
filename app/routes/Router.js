exports.mapRoute = function(app, prefix)
{	
	var prefixObj = require("../controllers/" + prefix + "/controller");	
	app.get("/" + prefix + "/:Name", prefixObj.show);
}