const Profile = require('../services/ProfileService')
exports.updateProfile = async (req, res) => {
    try {
        const data = {
            body: req.body,
            id: req.query.profile_id
        }

        const userProfile = await Profile.updateProfile(data)
        res.send('Profile Updated', userProfile)
    }
    catch (e) {
        res.send(e)
    }
}

exports.createProfile = async (req, res) => {
    try {
        const data = {
            body: req.body,
            id: req.user.sub
        }
        const out = await Profile.createProfile(data)
        res.status(200).send('user created')
    }
    catch (e) {
        console.log(e)
        res.send(e)
    }
}
exports.getUserProfile = async (req, res) => {
    try {
        const user_id = req.user.sub;
        const userProfile = await Profile.getUserProfile(user_id)
        res.send(userProfile)
    }
    catch (e) {
        res.send(e)
    }
}
exports.getAnyUserProfile = async (req, res) => {
    try {
        const user_id = req.query.profile_id
        const userProfile = await Profile.getAnyuserProfile(user_id)
        res.send(userProfile)
    }
    catch (e) {
        res.send(e)
    }
}
exports.uploadImage = async (req,res) =>{
    try{
        console.log(req.files)
        const user_id = req.user.sub;
        const data = await Profile.upload_image(user_id)
        res.send('profile_updated');
    }
    catch(e){
        res.send(e)
    }
}