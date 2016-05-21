var express = require('express');
var router = express.Router();

module.exports = function(passport)
{	
	FooterRoute(router);
	TablesRoute(router);
	AdsRoute(router);
	DepartmentsRoute(router);
	UsersRoute(router, passport);
	AdminRoute(router, passport);
	
	return router;
}

function FooterRoute(router){
	router.get("/help", function(req, res){ 
		res.render("footer/help.jade");
	});

	router.get("/callback", function(req, res){ 
		res.render("footer/callback.jade");
	});

	router.get("/developers", function(req, res){ 
		res.render("footer/developers.jade");
	});
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

	router.get("/Ads/find/" , controller.find);

	router.get("/Ads/result/" , controller.result);

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

	router.post("/Users/login/",  passport.authenticate('signin', {		
		    successRedirect: '/',
		    failureRedirect: '/Users/login/',
		    failureFlash : true 
	  })
	);

	router.get("/User/:Id/" , controller.show);
}

function AdminRoute(router, passport)
{
	var controller = require("../controllers/AdminController");	

	router.get("/Admin/root/", isAdmin, controller.root);

	router.get("/Admin/users/", isAdmin, controller.users);

	router.delete("/Admin/users/", isAdmin, controller.usersDelete);

	router.get("/Admin/departments/", isAdmin, controller.departments);

	router.delete("/Admin/departments/", isAdmin, controller.departmentsDelete);

	router.get("/Admin/departments/new/:Id", isAdmin, controller.departmentsCreate);

	router.get("/Admin/departments/new/", isAdmin, controller.departmentsCreate);

	router.post("/Admin/departments/new/:Id", isAdmin, controller.departmentsNew);

	router.post("/Admin/departments/new/", isAdmin, controller.departmentsNew);

	router.get("/Admin/ads/", isAdmin, controller.ads);

	router.delete("/Admin/ads/", isAdmin, controller.adsDelete);

	router.get("/Admin/ads/:count", isAdmin, controller.ads);

	router.get("/Admin/rootup/", controller.rootup);

	router.post("/Admin/rootup/", passport.authenticate("rootup", {		
		    successRedirect: '/Admin/root/',
		    failureRedirect: '/Admin/signup/',
		    failureFlash : true 
	  }));	

	router.get("/Admin/rootin/", controller.rootin);

	router.post("/Admin/rootin/", passport.authenticate("rootin", {		
		    successRedirect: '/Admin/root/',
		    failureRedirect: '/Admin/rootin/',
		    failureFlash : true 
	  }));	

}

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}

function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.isAdmin)
    return next();
  console.log(req.user);
  res.redirect('/');
}