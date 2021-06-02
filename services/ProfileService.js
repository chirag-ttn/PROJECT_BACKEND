const Profile = require('../models/main/profiles')
const Users = require('../models/main/users')
const {cloudinary} = require('../cloudinary')
const mongoose = require('mongoose')
exports.createProfile = async (data) => {

    try {
        let new_profile = null
        const ifProfileExist = await Profile.findOne({ user_id: data.id }).exec()
        if (ifProfileExist) {
            const all_profile_data = await Profile.aggregate([{$match:{_id:{$ne:ifProfileExist._id}}},{$project:{"_id":1}}])
            const profile = ifProfileExist
            
            
            profile.firstname = data.body.firstname
            profile.lastname = data.body.lastname
            profile.designation = data.body.designation
            profile.gender = data.body.gender
            profile.dob = data.body.dob
            profile.city = data.body.city
            profile.zip = data.body.zip
            profile.state = data.body.state
            profile.suggestions = all_profile_data
            new_profile = await profile.save();
        }
        else {
            const profile_img = await Users.findById({_id:data.id},{'profile_pic':1,_id:0})
            
            const all_profile_data = await Profile.aggregate([{$project:{"_id":1}}])
            const profile = new Profile({
                firstname: data.body.firstname,
                lastname: data.body.lastname,
                designation: data.body.designation,
                gender: data.body.gender,
                dob: data.body.dob,
                city: data.body.city,
                zip: data.body.zip,
                state: data.body.state,
                user_id: data.id,
                suggestions: all_profile_data,
                profile_image:profile_img.profile_pic
            })
            new_profile = await profile.save()
            
        }
        const user = await Users.findOneAndUpdate({_id:data.id},{$set:{'profile_id':new_profile._id}})
        return new_profile;

        
        
    }
    catch (err) {
        return new Error(err)
    }
}



exports.getUserProfile = async (id) => {
    try {
        console.log(id)
        const user = await Profile.findOne({user_id:id}).populate()
        .populate('friends')
        .populate('suggestions')
        .populate('requests')
        .populate('requested')
        if (user) {
            return user;
        }
        else {
            return null;
        }
    }
    catch (err) {
        return new Error(err);
    }
}

exports.getAnyUserProfile = async (id) => {
    try {

        const user = await Profile.findOne({ _id: id }).populate('suggestions').exec()
        console.log(user)
        if (user) {
            return user;
        }
        else {
            return null;
        }
    }
    catch (err) {
        return new Error(err);
    }
}
exports.uploadImage = async (id,file) => {
    try {
        const profile = await Profile.findOne({ user_id: id })        
        const { url } = await cloudinary.uploader.upload(file.path)
        
        if(file.fieldName=='profile_image')
        {
            profile.profile_image = url
        }
        else
        {
            profile.cover_image = url
        }
        return await profile.save()
    }
    catch (err) {
        return new Error(err);
    }
}
