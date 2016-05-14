var LocalStrategy   = require('passport-local').Strategy;
var AdminModel = require("../model/AdminModel").AdminModel; 

module.exports = function(passport){
	passport.use('rootup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
            AdminModel.findOne({ 'AdminName' :  username }, function(err, admin) {
                    // In case of any error, return using the done method
                    if (err){
                        console.log('Error in SignUp: '+err);
                        return done(err);
                    }
                    // already exists
                    if (admin) {
                        console.log('User already exists with username: '+ username);
                        return done(null, false, req.flash('message','User Already Exists'));
                    } else {
                        console.log(req.body);
                        var newAdmin = new AdminModel({
                            AdminName: username,
                            password: password
                        });
                        newAdmin.save(function(err){
                            if (err)
                            {
                                console.log('Error in Saving user: '+err);                                  
                                throw err;  
                            }       
                            else
                            {
                                console.log("Регистрация завершена!");   
                                return done(null, newAdmin);                               
                            }
                        });
                    }
                });
        })
    );
}
    