const Users = require('../models/main/users')
const Profiles = require('../models/main/profiles');
exports.getAllUsers = async () => {
    try {
        const data = await Users.find({}).exec()
        return data;
    }
    catch (err) {
        return err;
    }
}
exports.getUser = async (user_id) => {
    try {

        const data = (await Users.findById(user_id))
        return data;
    }
    catch (err) {
        return err;
    }
}

exports.addFriendRequested = async (user_id, friend_id) => {
    try {
        console.log(user_id, friend_id)
        //find user and take friend id from suggestion and put it in requested
        const user_profile = await Profiles.findOneAndUpdate(
            { _id: user_id },
            {
                $addToSet: {
                    'requested':friend_id
                },
                $pull: {

                    'suggestions': friend_id
                }
            }
            )
        await user_profile.save()
        //add user_id to requests in friends and remove from suggestions
        const friend_profile = await Profiles.findOneAndUpdate(
            { _id: friend_id },
            {
                $addToSet: {
                    'requests': user_id
                        
                    
                },
                $pull: {
                    'suggestions': user_id
                        
                    
                }
            })
        await friend_profile.save()
        return user_profile;
    }
    catch (err) {
        return err;
    }
}
exports.addFriendResponded = async (user_id, friend_id) => {
    try {
        //if a user responds to a request
        console.log(user_id, friend_id)
        // user view
        //user_id -> pull friend_id from requests && push friend_id to friends
        const user_profile = await Profiles.findOneAndUpdate(
            { _id: user_id },
            {
                $addToSet: {
                    'friends': friend_id
                        
                    
                },
                $pull: {
                    'requests': friend_id
                }
            })
        await user_profile.save()
        // friends view
        // friend_id -> pull user_id from requested && push user_id in friends
        const friend_profile = await Profiles.findOneAndUpdate(
            { _id: friend_id },
            {
                $addToSet: {
                    'friends': user_id
                },
                $pull: {
                    'requested': user_id
                }
            })
        await friend_profile.save()
        return user_profile;
    }
    catch (err) {
        return err;
    }
}
exports.removeFriend = async (user_id, friend_id) => {
    try {
        //if a user unfriends friend
        console.log(user_id, friend_id)
        // user view
        //user_id -> pull friend_id from friends && push friend_id to suggestions
        const user_profile = await Profiles.findOneAndUpdate(
            { _id: user_id },
            {
                $addToSet: {
                    'suggestions': friend_id
                },
                $pull: {
                    'friends': friend_id
                }
            })
        await user_profile.save()
        // friends view
        // friend_id -> pull user_id from friends && push user_id in suggestions
        const friend_profile = await Profiles.findOneAndUpdate(
            { _id: friend_id },
            {
                $addToSet: {
                    'suggestions': user_id
                },
                $pull: {
                    'friends': user_id
                }
            })
        await friend_profile.save()
        return user_profile;
    }
    catch (err) {
        return err;
    }
}
exports.rejectFriendResponded = async (user_id, friend_id) => {
    try {
        //if a user reject friend request
        // user view
        //user_id -> pull friend_id from requests && push friend_id to suggestions or not
        const user_profile = await Profiles.findOneAndUpdate(
            { _id: user_id },
            {
                $addToSet: {
                    'suggestions': friend_id
                },
                $pull: {
                    'requests': friend_id
                }
            })
        await user_profile.save()
        // friends view
        // friend_id -> pull user_id from requested && push user_id in suggestions
        const friend_profile = await Profiles.findOneAndUpdate(
            { _id: friend_id },
            {
                $addToSet: {
                    'suggestions': user_id
                },
                $pull: {
                    'requested': user_id
                }
            })
        await friend_profile.save()
        return user_profile;
    }
    catch (err) {
        return err;
    }
}
exports.revokeRequest = async (user_id, friend_id) => {
    try {
        //if a user revokes sended request
        // user view
        //user_id -> pull friend_id from requested && push friend_id to suggestions or not
        const user_profile = await Profiles.findOneAndUpdate(
            { _id: user_id },
            {
                $addToSet: {
                    'suggestions': friend_id
                },
                $pull: {
                    'requested': friend_id
                }
            })
        await user_profile.save()
        // friends view
        // friend_id -> pull user_id from requests && push user_id in suggestions
        const friend_profile = await Profiles.findOneAndUpdate(
            { _id: friend_id },
            {
                $addToSet: {
                    'suggestions': user_id
                },
                $pull: {
                    'requests': user_id
                }
            })
        await friend_profile.save()
        return user_profile;
    }
    catch (err) {
        return err;
    }
}