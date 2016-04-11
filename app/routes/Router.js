exports.mapRoute = function(app)
{	
	TablesRoute(app);
	AdsRoute(app);
	DepartmentsRoute(app);
	UsersRoute(app);
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

	// Id = TableId
	app.get("/Ads/create/:Id/" , controller.create);

	// Id = TableId
	app.post("/Ads/new/:Id/" , controller.new);

	app.put("/Ads/:Id/" , controller.update);	
}

function DepartmentsRoute(app)
{
	var controller = require("../controllers/DepartmentsController");

	app.get("/Departments/:Id/" , controller.show);
}

function UsersRoute(app)
{
	var controller = require("../controllers/UsersController");		

	app.get("/Users/create/" , controller.create);

	app.get("/Users/login/" , controller.login);

	app.post("/Users/enter/" , controller.enter);

	app.post("/Users/new/" , controller.new);	

	app.get("/Users/:Id" , controller.show);
}

