import mongoose from 'mongoose'
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
      password: {
        type: String,
        required: true,
        minlength: 3,
      },
      profile_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
      }
})
module.exports  = userSchema;