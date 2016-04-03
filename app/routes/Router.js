exports.mapRoute = function(app)
{	
	TablesRoute(app);
	AdsRoute(app);
	DepartmentsRoute(app);
}

function TablesRoute(app)
{
	var controller = require("../controllers/TablesController");

	app.get("/Tables/:Id/" , controller.show);
}

function AdsRoute(app)
{
	var controller = require("../controllers/AdsController");

	app.get("/Ads/:Id/" , controller.show);

	app.get("/Ads/create/:Id/" , controller.create);

	app.post("/Ads/new/:Id/" , controller.new);

	app.put("/Ads/:Id/" , controller.update);	
}

function DepartmentsRoute(app)
{
	var controller = require("../controllers/DepartmentsController");

	app.get("/Departments/:Id/" , controller.show);
}

