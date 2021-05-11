const mongoose = require('mongoose')

const requestedSchema = new mongoose.Schema({
    _id:{
        type:mongoose.Types.ObjectId,
        ref:"Profile",
        required:true,
    },
    user_name:{
        type:String,
        required:true,
    }
})
module.exports = requestedSchema