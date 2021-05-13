const express = require('express')
const router = express.Router();
const passport = require('passport')

const token = require('../auth-strategies/utils/token')
require('../auth-strategies/google')
function generateUserToken(req, res) {
    console.log(req.user)
    const accessToken = token.generateAccessToken(req.user[0]._id);
    res.cookie('token',accessToken)
    res.send(accessToken)
}

const cors = require('cors')
router.use(cors({origin:'*'}))
router.get('/',
(req,res,next)=>{
    // res.header('Access-Control-Allow-Origin','*');
    // res.header('Access-Control-Allow-Origin',"Origin, X-Requested-With,Content-Type, Accept")
    console.log('yes')
    next();
},
    passport.authenticate('google', { session: false, scope: ['openid', 'profile', 'email'] }));
router.get('/redirect',
    passport.authenticate('google', { session: false }),
    generateUserToken);

module.exports = router;