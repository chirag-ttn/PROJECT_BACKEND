const Profile = require('../../models/main/profiles')
const mongoose = require('mongoose')
createProfile = async (req,res)=>{
    console.log('req.body',req.body,'req.user',req.user)
    const newProfile = new Profile({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        dob:req.body.dob,
        gender:req.body.gender,
        user_id:req.user.sub,
        designation:req.body.designation,
        website:req.body.website,
        city:req.body.city,
        state:req.body.state,
        zip:req.body.zip
    })
        try{
            const id = mongoose.Types.ObjectId(req.user.sub)
            
            const user = await Profile.find({_id:id})
            if(!user)
            newProfile.save()
            .then(user=>{
                console.log(user)
                res.status(200).send('FormSubmitted')
            })
            .catch(err=>{
                console.log(err)
                res.status(400).send(err)
            })
            else{
                res.status(409).send('Resource Exists')
            }
        }
        catch(err)
        {
            throw err
        }
}
module.exports = {createProfile}