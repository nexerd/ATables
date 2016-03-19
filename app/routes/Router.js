exports.mapRoute = function(app, prefix)
{	
	var prefixObj = require("../controllers/" + prefix + "/controller");	
	app.get("/departmet/:id", prefixObj.show);
}