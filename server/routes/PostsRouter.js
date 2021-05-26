const express = require('express')
const cors = require('cors')
const router = express.Router();
const jwt = require('jsonwebtoken')
const passport = require('passport')
const passportjwt = require('passport-jwt')
const auth = require('../middlewares/jwt_auth')
require('../auth-strategies/jwt')

const PostRouter = require('../controllers/PostsController');

router.use(cors())
router.get('/getAllPosts',auth,PostRouter.getAllPosts);
router.post('/createPost',auth,PostRouter.createPost);
router.post('/deletePost',auth,PostRouter.deletePost);
router.post('/likePost',auth,PostRouter.likePost);
router.post('/unlikePost',auth,PostRouter.unlikePost);
router.post('/dislikePost',auth,PostRouter.dislikePost);
router.post('/undislikePost',auth,PostRouter.undislikePost);
router.post('/flagPost',auth,PostRouter.flagPost);
router.post('/unflag',auth,PostRouter.unflagPost);






module.exports = router;
