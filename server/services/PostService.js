const { response } = require('express')
const Posts = require('../models/main/posts')

exports.createPost = async function(data,res){
    try {
        
        const post = {
            description: data.text,
            author_id: data.id,
            imageUrl: data.url,
        }
        let new_post = new Posts(post)
        new_post.save().then(response=>{
            res.send(response)
        })
        .catch(err=>{
            return err
        })
    }
    catch (e) { 
        return e;
    }
}
exports.getAllPosts = async (user_id, data) => {
    try {
        const data = await Posts.find({})
        // console.log('SERVICE=>>>>>',data)
        return data;
    }
    catch (e) {
        throw new Error(e)
    }
}
exports.likePost = async (user_id, data) => {
    try {

    }
    catch (e) {
        throw new Error(e)
    }
}
exports.dislikePost = async (user_id, data) => {
    try {

    }
    catch (e) {
        throw new Error(e)
    }
}
exports.flagPost = async (user_id, data) => {
    try {

    }
    catch (e) {
        throw new Error(e)
    }
}
exports.createPost = async (user_id, data) => {
    try {

    }
    catch (e) {
        throw new Error(e)
    }
}
exports.unflagPost = async (user_id, data) => {
    try {

    }
    catch (e) {
        throw new Error(e)
    }
}