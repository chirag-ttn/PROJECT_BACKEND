const UserService = require('../services/UserService')
const Profile = require('../models/main/profiles')
const { cloudinary } = require('../cloudinary')


exports.getAllUsers = async (req, res) => {
    try {
        const data = await UserService.getAllUsers()
        res.send(data)
    }
    catch (err) {
        res.send(err)
    }

}
exports.getUser = async (req,res)=>{
    try{
        console.log(req.user.sub)
        const data = await UserService.getUser(req.user.sub)
        res.send(data)
    }
    catch(e){
        res.send(e)
    }
}
exports.addFriendRequested = async (req, res) => {
    try {
        
        const { user_id,friend_id } = req.query        
        const data = await UserService.addFriendRequested(user_id, friend_id)
        res.send(data)
    }
    catch (err) {
        res.send(err)
    }

}
exports.addFriendResponded = async (req, res) => {
    try {
        const { user_id,friend_id } = req.query        
        const data = await UserService.addFriendResponded(user_id, friend_id)
        res.send(data)
    }
    catch (err) {
        res.send(err)
    }

}
exports.removeFriend = async (req, res) => {
    try {
        const { user_id,friend_id } = req.query        
        const data = await UserService.removeFriend(user_id, friend_id)
        res.send(data)
    }
    catch (err) {
        res.send(err)
    }

}
exports.rejectFriendResponded = async (req, res) => {
    try {
        
        const { user_id,friend_id } = req.query  
        const data = await UserService.rejectFriendResponded(user_id, friend_id)
        res.send(data)
    }
    catch (err) {
        res.send(err)
    }

}

exports.revokeRequest = async (req, res) => {
    try {
        
        const { user_id,friend_id } = req.query        
        const data = await UserService.revokeRequest(user_id, friend_id)
        res.send(data)
    }
    catch (err) {
        res.send(err)
    }

}