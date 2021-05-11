const { authorize } = require('passport');
const passport = require('passport');
const passportJwt = require('passport-jwt');
const Users = require('../models/main/users')

const jwtOptions = {
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: process.env.SECRET_OR_KEY,
    issuer: process.env.ISSUER,
    audience: process.env.AUDIENCE
};

passport.use(new passportJwt.Strategy(jwtOptions, (payload, done) => {
    console.log(payload)
        Users.findById(payload.sub,(err,user)=>{
            if(err) return done(err)
            if(user)
            return done(null,user,payload)
            return done();
        })
    

}));