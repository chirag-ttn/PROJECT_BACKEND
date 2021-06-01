const mongoose = require('mongoose')

const requestSchema = ({
    
        type:mongoose.Types.ObjectId,
        ref:"Profile",
        required:true,
    
})
module.exports  = requestSchema;