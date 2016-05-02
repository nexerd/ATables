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

	router.get("/Tables/:Id/:count/" , controller.next);
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

	router.put("/Ads/:Id/comment/:number/", isAuthenticated, controller.updateComment);	

	router.delete("/Ads/:Id/", isAuthenticated, controller.delete);

	router.delete("/Ads/:Id/comment/:number/", isAuthenticated, controller.deleteComment);
}

function DepartmentsRoute(router)
{
	var controller = require("../controllers/DepartmentsController");	

	router.get("/Departments/select/" , controller.mainSelect);

	router.get("/Departments/select/:Id/" , controller.showSelect);

	router.get("/Departments/" , controller.main);

	router.get("/Departments/:Id/" , controller.show);
}

function UsersRoute(router, passport)
{
	var controller = require("../controllers/UsersController");		

	router.get("/Users/signup/" , controller.create);

	router.get("/Users/login/" , controller.login);

	router.get("/Users/login/" , controller.login);

	router.get("/Users/Departments/" , isAuthenticated, controller.departments);

	router.get("/Users/Hot/" , isAuthenticated, controller.hot);

	router.get("/Users/account/" , isAuthenticated, controller.account);

	router.put("/User/account/department/" , controller.updateDepartment);

	router.delete("/User/account/department/" , controller.deleteDepartment);

	router.post("/Users/signup/" , passport.authenticate('signup', {		
		    successRedirect: '/',
		    failureRedirect: '/Users/create/',
		    failureFlash : true 
	  }));	

	router.get("/Users/logout/" , function(req, res, next){
		req.logout();
  		res.redirect('/');
	});	

	router.post("/Users/login/",  passport.authenticate('login', {		
		    successRedirect: '/',
		    failureRedirect: '/Users/login/',
		    failureFlash : true 
	  })
	);

	router.get("/User/:Id/" , controller.show);
}

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}