var LocalStrategy   = require('passport-local').Strategy;
var UserModel = require("../model/UsersModel").UserModel; 

module.exports = function(passport){

	passport.use('signin', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) { 
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
                    console.log(username + ' is longin!');
                    return done(null, user);
                }
            );

        })
    );
}
    