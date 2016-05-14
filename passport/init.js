var signin = require('./signin');
var signup = require('./signup');
var rootup = require('./rootup');
var rootin = require('./rootin');
var UserModel = require("../model/UsersModel").UserModel; 
var AdminModel = require("../model/AdminModel").AdminModel; 

module.exports = function(passport){
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    UserModel.findById(id, function(err, user) {
      if (err){
        done(err, user);
      }
      if (!user){
        AdminModel.findById(id, function(err, admin){
          done(err, admin);
        })
      }
      else{
        done(err, user);
      }
    });
  });

  signin(passport);
  signup(passport);

  rootup(passport);
  rootin(passport);
}
