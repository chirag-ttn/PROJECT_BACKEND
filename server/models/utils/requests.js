const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({
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
module.exports  = requestSchema;