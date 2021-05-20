const users = require('../../models/main/users')

getUserData = async (req,res)=>{
    console.log('req.body',req.body,'req.user',req.user)
    try{
        const response = await users.findById({_id:req.user.sub}).exec()
        res.send(response)
    }
    catch(ex){
        throw ex
    }
}
module.exports = {getUserData}