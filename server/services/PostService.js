const Profile = require('../models/main/profiles')
const Posts = require('../models/main/posts')
const friends = require('../models/utils/friends')

exports.createPost = async function(data,res){
    try {
        console.log(new Date())
        const post = {
            description: data.text,
            author_id: data.id,
            imageUrl: data.url,
            date: new Date()
        }
        let new_post = new Posts(post)
        new_post.save().then(data=>{
            console.log(data)
            return data
        })
        .catch(err=>{
            return err
        })
    }
    catch (e) { 
        return e;
    }
}
exports.getAllPosts = async (user_id) => {
    try {
        const user_profile = await Profile.findOne({user_id:user_id})
        const friendsArr = user_profile.friends
        friendsArr.push(user_profile._id)
        const data = await Posts.find({author_id:{$in:friendsArr}}).populate('author_id').populate('comments.profile_id').sort({'date':-1}).exec();

        // console.log('SERVICE=>>>>>',data)
        return data;
    }
    catch (e) {
        return e;
    }
}
exports.likePost = async (user_profile_id, post_id) => {
    try {
        const post = await Posts.findOne({_id:post_id})
        post.likes.push(user_profile_id)
        let idx = post.dislikes.indexOf(user_profile_id)
        if(idx>-1)
        {
            post.dislikes.splice(idx,1)
        }
        return await post.save()
    }
    catch (e) {
        return e;
    }
}
exports.unlikePost = async (user_profile_id, post_id) => {
    try {
        const post = await Posts.findOne({_id:post_id})
        let idx = post.likes.indexOf(user_profile_id)
        if(idx>-1)
        {
            post.likes.splice(idx,1)
        }
        return await post.save()
    }
    catch (e) {
        return e;
    }
}
exports.dislikePost = async (user_profile_id, post_id) => {
    try {
        const post = await Posts.findOne({_id:post_id})
        post.dislikes.push(user_profile_id)
        let idx = post.likes.indexOf(user_profile_id)
        if(idx>-1)
        {
            post.likes.splice(idx,1)
        }
        return post.save()

    }
    catch (e) {
        return e;
    }
}
exports.undislikePost = async (user_profile_id, post_id) => {
    try {
        const post = await Posts.findOne({_id:post_id})
        let idx = post.dislikes.indexOf(user_profile_id)
        if(idx>-1)
        {
            post.dislikes.splice(idx,1)
        }
        return post.save()

    }
    catch (e) {
        return e;
    }
}
exports.flagPost = async (user_id, post_id) => {
    try {
        const post = await Posts.findOneAndUpdate({_id:post_id},{$inc:{'flagged':1}})
        return await post.save()
    }
    catch (e) {
        return e;
    }
}

exports.unflagPost = async (user_id, post_id) => {
    try {
        const post = await Posts.findOneAndUpdate({_id:post_id},{$dec:{'flagged':1}})
        return await post.save()
    }
    catch (e) {
        return e;
    }
}
exports.createComment = async (profile_id,post_id,comment) =>{
    try{
        const new_comment = {
            profile_id:profile_id,
            post_id:post_id,
            comment:comment
        }
        // console.log('COMMENT=====>',new_comment)
        const post = await Posts.findOneAndUpdate({_id:post_id},{$push:{'comments':new_comment}})
        const data = await post.save()
        // console.log('DATA======>',data)
        return data;
    }
    catch(e){
        return e;
    }
}
exports.verifyLikeStatus = async (profile_id,post_id)=>{
    try{
        const data = await Posts.findOne({_id:post_id})
        let idx = data.likes.indexOf(profile_id)
        return (idx>-1)?true:false
    }
    catch(e){
        return e;
    }
}
exports.verifyDislikeStatus = async (profile_id,post_id)=>{
    try{
        const data = await Posts.findOne({_id:post_id})
        let idx = data.dislikes.indexOf(profile_id)
        return (idx>-1)?true:false
    }
    catch(e){
        return e;
    }
}