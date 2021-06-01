const mongoose = require('mongoose')

module.exports = ({
    
        type:mongoose.Types.ObjectId,
        ref:"Profile",
        required:true,
    
})