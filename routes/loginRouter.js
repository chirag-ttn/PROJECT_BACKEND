const express = require('express')
const router = express.Router();
const passport = require('passport')
const cors = require('cors')
const token = require('../auth-strategies/utils/token')
const UserController = require('../controllers/UserController')
require('dotenv').config()
require('../auth-strategies/google')
const {NODE_ENV,PROD_URL, DEV_RED_URL } = process.env
console.log(NODE_ENV,PROD_URL,DEV_RED_URL)
function generateUserToken(req, res,next) {
    console.log("req object=======>",req.user)
    const id = req.user._id===undefined?req.user[0]._id:req.user._id
    const accessToken = token.generateAccessToken(id);
    
    res.cookie('token',accessToken)
    res.redirect(`${NODE_ENV==='development'?DEV_RED_URL:PROD_URL}`)
    
}
// router.use(cors())
router.get('/',passport.authenticate('google', { session: false, scope: ['openid', 'profile', 'email'] },UserController.getUser));
router.get('/redirect',
    passport.authenticate('google', { session: false }),
    generateUserToken);

module.exports = router;