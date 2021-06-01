const express = require('express')
const cors = require('cors')
const router = express.Router();
const jwt = require('jsonwebtoken')
const passport = require('passport')
const passportjwt = require('passport-jwt')
const ProfileController = require('../controllers/ProfileController')
const auth = require('../middlewares/jwt_auth');
require('../auth-strategies/jwt')
require('dotenv').config()
router.use(cors())
router.post('/createProfile',auth,ProfileController.createProfile);
router.post('/uploadImage',auth,ProfileController.uploadImage);
router.get('/getUserProfile',auth,ProfileController.getUserProfile);
router.get('/getAnyUserProfile',auth,ProfileController.getAnyUserProfile);
module.exports = router;