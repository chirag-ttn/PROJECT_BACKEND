const express = require('express')
const cors = require('cors')
const router = express.Router();
const jwt = require('jsonwebtoken')
const passport = require('passport')
const passportjwt = require('passport-jwt')
const ProfileController = require('../controllers/profile/createProfile')
const auth = require('../middlewares/jwt_auth')
require('../auth-strategies/jwt')
require('dotenv').config()
router.use(cors())
router.post('/',auth,ProfileController.createProfile);

module.exports = router;