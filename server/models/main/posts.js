import mongoose from 'mongoose'
const {Schema} = mongoose;
const likeSchema = require('../utils/comment')
const commentSchema = require('../utils/comment')
var ObjectId = Schema.ObjectId;
const postSchema = new Schema({
    description: {
        type: String,
        required: true,
        minlength: 5,
      },
      author_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Profile",
      },
      image: {
        data: Buffer,
        contentType: String,
      },
      hasImage: {
        type: Boolean,
        default: false,
      },
      likes: {
        type: [likeSchema],
        default: [],
      },
      comments: {
        type: [commentSchema],
        default: [],
      },
      date: {
        type: Date,
        default: Date.now(),
      },
})
module.exports = postSchema;