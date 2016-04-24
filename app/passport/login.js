var LocalStrategy   = require('passport-local').Strategy;
var UserModel = require("../model/UsersModel").UserModel; 

module.exports = function(passport){

	passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) { 
            // check in mongo if a user with username exists or not
            console.log('user: ' + username);
            console.log('password: ' + password);
            UserModel.findOne({ 'UserName' :  username }, 
                function(err, user) {
                    if (err) { return done(err); }
                    if (!user) {
                        console.log('Incorrect username.');
                        return done(null, false, { message: 'Incorrect username.' });
                    }
                    if (!user.checkPassword(password)) {
                        console.log('Incorrect password.');
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                    return done(null, user);
                }
            );

        })
    );
}
    