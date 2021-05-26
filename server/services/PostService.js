const Profile = require('../models/main/profiles')
const Posts = require('../models/main/posts')
const friends = require('../models/utils/friends')

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
exports.getAllPosts = async (user_id) => {
    try {
        const user_profile = await Profile.findOne({user_id:user_id})
        const friendsArr = user_profile.friends
        friendsArr.push(user_profile._id)
        console.log(friendsArr)
        const data = await Posts.find({author_id:{$in:friendsArr}}).populate('author_id').skip(0).limit(100).exec();

        console.log('SERVICE=>>>>>',data)
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