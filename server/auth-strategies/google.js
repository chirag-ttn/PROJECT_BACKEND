const passport = require('passport');
const passportGoogle = require('passport-google-oauth');
require('dotenv').config()
// const users = require('../users');
const Users = require('../models/main/users')
const passportConfig = {
    clientID: process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:4444/api/auth/redirect'
};

if (passportConfig.clientID) {
    passport.use(new passportGoogle.OAuth2Strategy(passportConfig, function (request, accessToken, refreshToken, profile, done) {

        Users.find({email:profile.emails[0].value},(err,user)=>{
            // console.log(user)
            if(err) return done(err);
            if(!user)
            {
                user = new Users({
                    email:profile.emails[0].value.toString()
                })
                console.log(user)
                user.save((err)=>{
                    err?console.log(err):console.log('Yay')
                });
            }
            return done(null,user)
        
        });
    }));
}