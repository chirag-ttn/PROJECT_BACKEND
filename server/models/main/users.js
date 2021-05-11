const mongoose = require('mongoose')
const {Schema} = mongoose;
var ObjectId = Schema.ObjectId;
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true,
      }
})
const users = mongoose.model('Users', userSchema);

module.exports  = users;