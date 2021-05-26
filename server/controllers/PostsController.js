const PostService = require('../services/PostService')
const Posts = require('../models/main/posts')
const {createPost} = PostService
const { cloudinary } = require('../cloudinary')


exports.createPost = async (req, res) => {
    // console.log(req)
    try {
        const user_id = req.user.sub;
        const file = req.files.image
        const text = req.body.text
        
        const {url} = await cloudinary.uploader.upload(file.path)
        const data = {
            id:user_id,
            text:text,
            url:url
        }
        // console.log(data)
        const post = {
            description: data.text,
            author_id: data.id,
            imageUrl: data.url,
        }
        const new_post = new Posts(post);
        new_post.save().then(response=>{
            // console.log(response)
            res.send(response)
        }).catch(e=>{
            // console.log(e)
            res.send(e)
        })
        
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
        const user_id = req.user.sub;
        const post_id = req.body.id
        const response = PostService.likePost(user_id, post_id)
        res.send(response)
    }
    catch (e) {
        res.send(e)
    }
}
exports.dislikePost = async (req, res, next) => {
    // console.log(req.body, req.user)

    try {
        const user_id = req.user.sub;
        const post_id = req.body.id
        const response = PostService.dislikePost(user_id, post_id)
        res.send(response)
    }
    catch (e) {
        res.send(e)
    }
}
exports.flagPost = async (req, res, next) => {
    // console.log(req.body, req.user)

    try {
        const user_id = req.user.sub;
        const post_id = req.body.id
        const response = PostService.flagPost(user_id, post_id)
        res.send(response)
    }
    catch (e) {
        res.send(e)
    }
}
exports.unflagPost = async (req, res, next) => {
    // console.log(req.body, req.user)

    try {
        const user_id = req.user.sub;
        const post_id = req.body.id
        const response = PostService.unflagPost(user_id, post_id)
        res.send(response)
    }
    catch (e) {
        res.send(e)
    }
}
exports.deletePost = async (user_id, data) => {
    try {

    }
    catch (e) {
        throw new Error(e)
    }
}