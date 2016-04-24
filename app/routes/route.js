var express = require('express');
var router = express.Router();

module.exports = function(passport)
{	
	TablesRoute(router);
	AdsRoute(router);
	DepartmentsRoute(router);
	UsersRoute(router, passport);

	return router;
}

function TablesRoute(router)
{
	var controller = require("../controllers/TablesController");

	router.get("/Tables/:Id/" , controller.show);
}

function AdsRoute(router)
{
	var controller = require("../controllers/AdsController");

	router.get("/Ads/:Id/" , controller.show);

	// Id = TableId
	router.get("/Ads/create/:Id/" , isAuthenticated, controller.create);

	// Id = TableId
	router.post("/Ads/new/:Id/" , isAuthenticated, controller.new);

	router.put("/Ads/:Id/" , isAuthenticated, controller.update);	
}

function DepartmentsRoute(router)
{
	var controller = require("../controllers/DepartmentsController");

	router.get("/Departments/:Id/" , controller.show);
}

function UsersRoute(router, passport)
{
	var controller = require("../controllers/UsersController");		

	router.get("/Users/create/" , controller.create);

	router.get("/Users/login/" , controller.login);

	//router.post("/Users/enter/" , controller.enter);

	router.post("/Users/new/" , passport.authenticate('signup', {		
		    successRedirect: '/',
		    failureRedirect: '/Users/create/',
		    failureFlash : true 
	  }));	

	router.get("/Users/logout" , function(req, res, next){
		req.logout();
  		res.redirect('/');
	});

	router.get("/Users/:Id" , controller.show);

	router.post("/Users/enter/",  passport.authenticate('login', {		
		    successRedirect: '/',
		    failureRedirect: '/Users/login/',
		    failureFlash : true 
	  })
	);
}

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}