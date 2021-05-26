const mongoose = require('mongoose')

const requestedSchema = ({
    type:mongoose.Types.ObjectId,
    ref:'Profile',
    required:true,
})
module.exports = requestedSchema