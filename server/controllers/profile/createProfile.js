const Profile = require('../../models/main/profiles')

createProfile = (req,res)=>{
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
        newProfile.save()
        .then(user=>{
            console.log(user)
        })
        .catch(err=>{
            console.log(err)
        })
    res.redirect('http://localhost:3000/')
}
module.exports = {createProfile}