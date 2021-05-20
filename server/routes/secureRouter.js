const express = require('express')
const router = express.Router()
const passport = require('passport')
const auth = require('../middlewares/jwt_auth')
const user  = require('../controllers/userData/userData')
require('../auth-strategies/jwt')
router.get('/',auth,
    (req, res) => {
        res.send('Secure response from ' + JSON.stringify(req.user));
    });
router.get('/getUserData',(req,res,next)=>{
    console.log(req.headers)
    next();
},auth,user.getUserData)

module.exports = router;