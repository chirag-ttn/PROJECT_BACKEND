const mongoose = require('mongoose')
const { Schema } = mongoose;
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,

  },
  f_name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  l_name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  role:{
    type:String,
    default:'user'
  },
  profile_pic: {
    type: String,
  },
  profile_id: {
    _id: {
      type: mongoose.Types.ObjectId,
      ref: 'profile'
    }
  }

})
const users = mongoose.model('Users', userSchema);

module.exports = users;