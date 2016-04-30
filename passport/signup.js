var LocalStrategy   = require('passport-local').Strategy;
var UserModel = require("../model/UsersModel").UserModel; 

module.exports = function(passport){

	passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
            UserModel.findOne({ 'UserName' :  username }, function(err, user) {
                    // In case of any error, return using the done method
                    if (err){
                        console.log('Error in SignUp: '+err);
                        return done(err);
                    }
                    // already exists
                    if (user) {
                        console.log('User already exists with username: '+ username);
                        return done(null, false, req.flash('message','User Already Exists'));
                    } else {
                        console.log(req.body);
                        var newUser = new UserModel({
                            UserName: username,
                            password: password,
                            FirstName: req.body.firstname,
                            SecondName: req.body.secondname,
                            ThirdName: req.body.thirdname
                        });
                        newUser.save(function(err){
                            if (err)
                            {
                                console.log('Error in Saving user: '+err);                                  
                                throw err;  
                            }       
                            else
                            {
                                console.log("Регистрация завершена!");   
                                return done(null, newUser);                               
                            }
                        });
                    }
                });
        })
    );
}