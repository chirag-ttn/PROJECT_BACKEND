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
        const data = await new_post.save()
        console.log(data)
        return data;
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
exports.getPosts = async (user_id, pageCount, postCount) => {
    try {
        const user_profile = await Profile.findOne({user_id:user_id})
        const friendsArr = user_profile.friends
        friendsArr.push(user_profile._id)
        const data = await Posts.find({author_id:{$in:friendsArr}}).populate('author_id').populate('comments.profile_id').sort({'date':-1}).skip(pageCount*5).limit(postCount).exec();
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
        const post = await Posts.findOneAndUpdate(
            {_id:post_id},
            {
                $addToSet:{
                    'flagged':user_id
                }
            })
        return await post.save()
    }
    catch (e) {
        return e;
    }
}

exports.unflagPost = async (user_id, post_id) => {
    try {
        const post = await Posts.findOneAndUpdate(
            {_id:post_id},
            {
                $pull:{'flagged':user_id}
            })
        return await post.save()
    }
    catch (e) {
        return e;
    }
}
exports.getFlaggedPosts = async () => {
    try {
        const post = await Posts.find({}).sort({'date':-1}).populate('author_id').populate('comments.profile_id').lean().exec()
        // console.log(post)
        const finalData = post.map(val=>{
            return val.flagged.length>=5?val:null
        })
        // Posts.find({$where:'this.flagged.length'}).populate('author_id').populate('comments.profile_id').exec()
        return finalData;
    }
    catch (e) {
        return e;
    }
}
exports.removeFlaggedPost = async (post_id) => {
    try {
        
        const {author_id}= await Posts.findOne({_id:post_id}).lean()
        const post = await Posts.findOneAndDelete({_id:post_id})
        const update =  await Profile.findOneAndUpdate({_id:author_id},{$pull:{posts:post_id}})
        await update.save()
        return post;
    }
    catch (e) {
        return e;
    }
}
exports.approveFlaggedPost = async (post_id) => {
    try {
        const post = await Posts.findOneAndUpdate({_id:post_id},
            {
                $set:
                {'flagged':[]}
            })
        await post.save()
        return post;
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
