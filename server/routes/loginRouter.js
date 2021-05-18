const express = require('express')
const router = express.Router();
const passport = require('passport')
const cors = require('cors')
const token = require('../auth-strategies/utils/token')
const {userData} = require('../controllers/userData/userData')
require('../auth-strategies/google')

function generateUserToken(req, res,next) {
    console.log(req.user)
    const accessToken = token.generateAccessToken(req.user[0]._id);
    
    res.cookie('token',accessToken)
    res.redirect('http://localhost:3000/')
    
}
// router.use(cors())
router.get('/',passport.authenticate('google', { session: false, scope: ['openid', 'profile', 'email'] },userData));
router.get('/redirect',
    passport.authenticate('google', { session: false }),
    generateUserToken);

module.exports = router;