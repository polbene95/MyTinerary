const passport =  require("passport");
const GoogleStrategy = require("passport-google-oauth20");  
const LocalStrategy = require("passport-local").Strategy
const User = require("../models/UserModel");


passport.use( new GoogleStrategy({
    //option for the strategy
    callbackURL: "http://localhost:3000/web/redirect",
    clientID: "628382447518-eaueb8rst1klskagu3s144vol38l7c3g.apps.googleusercontent.com",
    clientSecret: "iNsqGoYJr0rk0uF89zPqUQar"
}, (accesToken,resfreshToken,profile,done) => { 
    const user = new User({
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        src: profile.photos[0].value,
        id:  profile.id,
        loginForm: "Google"
    })
    return done(user)
}))
