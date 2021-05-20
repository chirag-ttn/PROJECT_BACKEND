const passport = require('passport');
const passportGoogle = require('passport-google-oauth');
require('dotenv').config()
const cloudinary = require('../cloudinary')

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
            
            if(err) return done(err);
            if(!user.length)
            {
                
                user = new Users({
                    email:profile.emails[0].value.toString(),
                    f_name:profile.name.givenName,
                    l_name:profile.name.familyName,
                    profile_pic:profile.photos[0].value
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