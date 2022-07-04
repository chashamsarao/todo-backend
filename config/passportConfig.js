const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
//
const GoogleStrategy = require('passport-google-oauth20').Strategy;


const { User } = require("../db/models/user.model")
//
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
//


passport.use(
    new localStrategy({ usernameField: 'email'}, 
    (username, password, done) => {
        User.findOne({ email : username },
            (err, newUser) => {
                if(err) 
                    return done(err)
                else if (!newUser) 
                    return done(null, false, {message: 'Email is not registered'})
                else if (!newUser.verifyPassword(password))        //define verifyPassword in user schema
                    return done(null, false, {message : 'Wrong password'})
                else
                    return done(null, newUser);

            });
    })
);


//

// passport.use(new GoogleStrategy({
//     clientID: GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:3000/api/login-with-google/callback",
//     passReqToCallback: true,
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ googleId: profile.id }, function (err, newUser) {
//       return cb(err, newUser);
//     });
//   }
// ));
  
// passport.serializeUser(function(newUser, done) {
//    // The USER object is the "authenticated user" from the done() in authUser function.
//      // serializeUser() will attach this user to "req.session.passport.user.{user}", so that it is tied to the session object for each session.
//   done(null, newUser);
// });

// passport.deserializeUser(function(newUser, done) {

//   // This is the {user} that was saved in req.session.passport.user.{user} in the serializationUser()
//   // deserializeUser will attach this {user} to the "req.user.{user}", so that it can be used anywhere in the App.
//   done(null, newUser);
// });



//


