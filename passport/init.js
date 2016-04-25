var login = require('./login');
var signup = require('./signup');
var UserModel = require("../model/UsersModel").UserModel; 

module.exports = function(passport){
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    UserModel.findById(id, function(err, user) {
      done(err, user);
    });
  });

  login(passport);
  signup(passport);
}
