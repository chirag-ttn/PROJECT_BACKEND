const Profile = require('../models/main/profiles')
const Users = require('../models/main/users')
const mongoose = require('mongoose')
exports.createProfile = async (data) => {

    try {
        //find all the profile_ids of all users and add it to suggestions initially
        let new_profile = null
        const ifProfileExist = await Profile.findOne({ user_id: data.id }).exec()
        if (ifProfileExist) {
            const all_profile_data = await Profile.aggregate([{$match:{_id:{$ne:ifProfileExist._id}}},{$project:{"_id":1}}])
            const profile = ifProfileExist
            
            
            profile.firstname = data.body.firstname
            profile.lastname = data.body.lastname
            profile.designation = data.body.designation
            profile.website = data.body.website
            profile.gender = data.body.gender
            profile.dob = data.body.dob
            profile.city = data.body.city
            profile.zip = data.body.zip
            profile.state = data.body.state
            profile.suggestions = all_profile_data
            new_profile = await profile.save();
        }
        else {
            const all_profile_data = await Profile.aggregate([{$project:{"_id":1}}])
            const profile = new Profile({
                firstname: data.body.firstname,
                lastname: data.body.lastname,
                designation: data.body.designation,
                website: data.body.website,
                gender: data.body.gender,
                dob: data.body.dob,
                city: data.body.city,
                zip: data.body.zip,
                state: data.body.state,
                user_id: data.id,
                suggestions: all_profile_data
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
