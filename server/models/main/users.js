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
        
      },
      f_name:{
        type:String,
        required:true,
        minlength: 5,
        maxlength: 255,
      },
      l_name:{
        type:String,
        required:true,
        minlength: 5,
        maxlength: 255,
      },

      profile_pic:{
        type:String,
      }
})
const users = mongoose.model('Users', userSchema);

module.exports  = users;