const express = require('express')
const cors = require('cors')
const router = express.Router();
const jwt = require('jsonwebtoken')
const passport = require('passport')
const passportjwt = require('passport-jwt')
const auth = require('../middlewares/jwt_auth')
require('../auth-strategies/jwt')

const UserController = require('../controllers/UserController');

router.use(cors())
router.get('/getAllUsers', auth, UserController.getAllUsers);
router.get('/getUser',auth,UserController.getUser)
router.get('/updateSuggestions',auth,UserController.updateSuggestions)
router.get('/addFriendRequested',auth, UserController.addFriendRequested);
router.get('/addFriendResponded', UserController.addFriendResponded);
router.get('/rejectFriendResponded', UserController.rejectFriendResponded);
router.get('/revokeRequest', UserController.revokeRequest);
router.get('/removeFriend', UserController.removeFriend);






module.exports = router;
