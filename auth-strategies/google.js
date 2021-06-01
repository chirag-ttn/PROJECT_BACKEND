const passport = require('passport');
const passportGoogle = require('passport-google-oauth');
require('dotenv').config()

const cloudinary = require('../cloudinary')

// const users = require('../users');
const Users = require('../models/main/users')
const {NODE_ENV,PROD_URL, DEV_URL } = process.env

const passportConfig = {
    clientID: process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    callbackURL: `${NODE_ENV==='development'?DEV_URL:PROD_URL}/api/auth/redirect`
};

if (passportConfig.clientID) {
    passport.use(new passportGoogle.OAuth2Strategy(passportConfig, function (request, accessToken, refreshToken, profile, done) {
        
        Users.find({email:profile.emails[0].value},(err,user)=>{
            
            if(err) return done(err);
            if(!user.length)
            {
                const role = profile.emails[0].value.toString()=='chirag.gandhi@tothenew.com'?'admin':'user';
                user = new Users({
                    email:profile.emails[0].value.toString(),
                    f_name:profile.name.givenName,
                    l_name:profile.name.familyName,
                    profile_pic:profile.photos[0].value,
                    role:role
                })
                user.save((err)=>{
                    return(err)
                });
            }
            return done(null,user)
        
        });
    }));
}