const express = require('express')
const cors = require('cors')
const router = express.Router();
const jwt = require('jsonwebtoken')
const passport = require('passport')
const passportjwt = require('passport-jwt')
const ProfileController = require('../controllers/profile/createProfile')
require('../auth-strategies/jwt')
require('dotenv').config()
router.use(cors())

router.post('/',(req,res,next)=>{
    const authToken = req.headers.authorization;
    console.log(authToken,process.env.SECRET_OR_KEY)
    jwt.verify(authToken,process.env.SECRET_OR_KEY,(err,decoded)=>{
        if(err){
            res.redirect('http://localhost:3000')
            throw err
        }
        req.user = decoded
    })
    next()
},ProfileController.createProfile);

module.exports = router;