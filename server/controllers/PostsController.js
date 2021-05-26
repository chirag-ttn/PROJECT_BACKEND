const PostService = require('../services/PostService')
const Posts = require('../models/main/posts')
const Profile = require('../models/main/profiles')
const { cloudinary } = require('../cloudinary')


exports.createPost = async (req, res) => {
    try {
        const file = req.files.image
        const text = req.body.text
        const id = req.body.profile_id
        
        const {url} = await cloudinary.uploader.upload(file.path)
        const data = {
            id:id,
            text:text,
            url:url
        }
        console.log(data)
        const post = {
            description: data.text,
            author_id: data.id,
            imageUrl: data.url,
        }
        
        const new_post = new Posts(post);
        const response = await new_post.save()
        // console.log(response)
        // updating profile with post id
        const profile =  await Profile.findOneAndUpdate({_id:id},{
            $addToSet:{
                'posts':response._id
            }
        })
        const resp = await profile.save()
        // console.log(resp)
        res.send(response)
        
    }
    catch (e) {
        res.send(e)
    }
}
// currently getting all the post,change it later to find only posts of user's friend
exports.getAllPosts = async (req, res, next) => {
    // console.log(req.body, req.user)

    try {
        const user_id = req.user.sub;
        const response = await PostService.getAllPosts(user_id)
        res.send(response)
    }
    catch (e) {
        res.send(e)
    }
}
exports.likePost = async (req, res, next) => {
    // console.log(req.body, req.user)

    try {
        console.log(req.query)
        const {user_profile_id,post_id} = req.query
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
        const {user_profile_id,post_id} = req.query
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
        const {user_profile_id,post_id} = req.query
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
        const {user_profile_id,post_id} = req.query
        const response = PostService.undislikePost(user_profile_id, post_id)
        res.send(response)
    }
    catch (e) {
        res.send(e)
    }

}
exports.flagPost = async (req, res, next) => {
    // console.log(req.body, req.user)

    
}
exports.unflagPost = async (req, res, next) => {
    // console.log(req.body, req.user)

    
}
exports.deletePost = async (user_id, data) => {
    try {

    }
    catch (e) {
        throw new Error(e)
    }
}