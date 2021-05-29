const PostService = require('../services/PostService')
const Posts = require('../models/main/posts')
const Profile = require('../models/main/profiles')
const { cloudinary } = require('../cloudinary')


exports.createPost = async (req, res) => {
    try {
        const file = req.files.image
        const text = req.body.text
        const id = req.body.profile_id

        const { url } = await cloudinary.uploader.upload(file.path)
        const data = {
            id: id,
            text: text,
            url: url
        }
        console.log(data)
        const post = {
            description: data.text,
            author_id: data.id,
            imageUrl: data.url,
            date: new Date()
        }

        const new_post = new Posts(post);
        const response = await new_post.save()
        // console.log(response)
        // updating profile with post id
        const profile = await Profile.findOneAndUpdate({ _id: id }, {
            $addToSet: {
                'posts': response._id
            }
        })
        const resp = await profile.save()
        // console.log(resp)
        res.send(response)

    }
    catch (e) {
        console.log('error',e)
        res.send(e)
    }
}
// currently getting all the post,change it later to find only posts of user's friend
exports.getAllPosts = async (req, res, next) => {
    // console.log(req.body, req.user)

    try {
        const user_id = req.user.sub;
        const response = await PostService.getAllPosts(user_id)//sync
        res.send(response)
    }
    catch (e) {
        res.send(e)
    }
}
exports.likePost = async (req, res, next) => {
    // console.log(req.body, req.user)

    try {
        console.log(req.body)
        const { user_profile_id, post_id } = req.body
        const response = PostService.likePost(user_profile_id, post_id)
        res.send(response)
    }
    catch (e) {
        res.send(e)
    }
}
exports.unlikePost = async (req, res, next) => {
    // console.log(req.body, req.user)

    try {
        const { user_profile_id, post_id } = req.body
        const response = PostService.unlikePost(user_profile_id, post_id)
        res.send(response)
    }
    catch (e) {
        res.send(e)
    }

}
exports.dislikePost = async (req, res, next) => {
    // console.log(req.body, req.user)

    try {
        const { user_profile_id, post_id } = req.body
        const response = PostService.dislikePost(user_profile_id, post_id)
        res.send(response)
    }
    catch (e) {
        res.send(e)
    }

}
exports.undislikePost = async (req, res, next) => {
    // console.log(req.body, req.user)

    try {
        const { user_profile_id, post_id } = req.body
        const response = PostService.undislikePost(user_profile_id, post_id)
        res.send(response)
    }
    catch (e) {
        res.send(e)
    }

}
exports.flagPost = async (req, res, next) => {
    try {
        const { user_profile_id, post_id } = req.body
        const response = await PostService.flagPost(user_profile_id, post_id)
        res.send(response)
    }
    catch (e) {
        res.send(e)
    }
}
exports.unflagPost = async (req, res, next) => {
    try {
        const { user_profile_id, post_id } = req.body
        const response = await PostService.unflagPost(user_profile_id, post_id)
        res.send(response)
    }
    catch (e) {
        res.send(e)
    }
}
exports.getFlaggedPosts = async (req, res, next) => {
    try {
        const response = await PostService.getFlaggedPosts()
        res.send(response)
    }
    catch (e) {
        res.send(e)
    }
}
//moderator
exports.removeFlaggedPosts = async (req,res,next) => {
    try {
        console.log('remove ')
        const {post_id} = req.body
        const response = await PostService.removeFlaggedPost(post_id)
        res.send(response)
    }
    catch (e) {
        res.send(e)
    }
}

exports.approveFlaggedPosts = async (req,res,next) => {
    try {
        const {post_id} = req.body
        const response = await PostService.approveFlaggedPost(post_id)
        res.send(response)
    }
    catch (e) {
        res.send(e)
    }
}
exports.createComment = async (req, res, next) => {

    try {
        const { profile_id, post_id, comment} = req.body
        const data = await PostService.createComment(profile_id, post_id, comment)
        res.send(data)
    }
    catch(e){
        res.send(e)
    }
    
}
exports.verifyLikeStatus = async (req,res) => {
    try {
        const {user_profile_id,post_id} = req.query
        const response = await PostService.verifyLikeStatus(user_profile_id,post_id)
        res.send(response)
    }
    catch (e) {
        res.send(e)
    }
}

exports.verifyDislikeStatus = async (req,res) => {
    try {
        const {user_profile_id,post_id} = req.query
        const response = await PostService.verifyDislikeStatus(user_profile_id,post_id)
        console.log(response)
        res.send(response)

    }
    catch (e) {
        res.send(e)
    }
}