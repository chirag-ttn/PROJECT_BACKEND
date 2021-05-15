const express = require('express')
const router = express.Router();
const passport = require('passport')
const cors = require('cors')
const token = require('../auth-strategies/utils/token')
require('../auth-strategies/google')

function generateUserToken(req, res) {
    
    const accessToken = token.generateAccessToken(req.user[0]._id);
    
    res.cookie('token',accessToken)
    res.redirect('http://localhost:3000/')
}
// router.use(cors())
router.get('/',passport.authenticate('google', { session: false, scope: ['openid', 'profile', 'email'] }));
router.get('/redirect',
    passport.authenticate('google', { session: false }),
    generateUserToken);

module.exports = router;