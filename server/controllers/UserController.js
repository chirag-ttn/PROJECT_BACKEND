const UserService = require('../services/UserService')
const Users = require('../models/main/users')
const mongoose = require('mongoose')
const { cloudinary } = require('../cloudinary')
const Profile = require('../models/main/profiles')

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
        const data = await UserService.getUser(req.user.sub)
        res.send(data)
    }
    catch(e){
        res.send(e)
    }
}
exports.updateSuggestions = async (req,res)=>{
    try{
        
        const user_id = req.user.sub;
        const user_profile_id = req.query.user_id
        const data = await Users.find({_id:{$ne:user_id}},{'profile_id':1,_id:0}).exec()
        const pureData = data.map((val)=>{
            return (val.profile_id)
        })
        const updateProfile = await Profile.updateOne({_id:user_profile_id},{$addToSet:{'suggestions':pureData}})
        
        console.log(pureData,updateProfile)
        res.send(pureData)
    }
    catch(err){
        res.send(err)
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