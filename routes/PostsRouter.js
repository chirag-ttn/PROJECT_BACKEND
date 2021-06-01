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
router.get('/getPosts',auth,PostRouter.getPosts);
router.post('/createPost',auth,PostRouter.createPost);

router.post('/likePost',auth,PostRouter.likePost);
router.post('/unlikePost',auth,PostRouter.unlikePost);
router.post('/dislikePost',auth,PostRouter.dislikePost);
router.post('/undislikePost',auth,PostRouter.undislikePost);


router.post('/createComment',auth,PostRouter.createComment);

router.post('/flagPost',auth,PostRouter.flagPost);
router.post('/unflagPost',auth,PostRouter.unflagPost);

router.get('/getFlaggedPosts',auth,PostRouter.getFlaggedPosts);
router.post('/approveFlaggedPost',auth,PostRouter.approveFlaggedPosts);
router.post('/removeFlaggedPost',auth,PostRouter.removeFlaggedPosts);







module.exports = router;
