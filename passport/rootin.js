var LocalStrategy   = require('passport-local').Strategy;
var AdminModel = require("../model/AdminModel").AdminModel; 

module.exports = function(passport){
	passport.use('rootin', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) { 
            AdminModel.findOne({ 'AdminName' :  username }, 
                function(err, admin) {
                    if (err) { return done(err); }
                    if (!admin) {
                        console.log('Incorrect username.');
                        return done(null, false, { message: 'Incorrect username.' });
                    }
                    if (!admin.checkPassword(password)) {
                        console.log('Incorrect password.');
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                    console.log(username + ' is longin!');
                    return done(null, admin);
                }
            );

        })
    );
}
    