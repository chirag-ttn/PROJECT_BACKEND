const mongoose = require('mongoose')
const {Schema} = mongoose;
const likeSchema = require('../utils/comment')
const commentSchema = require('../utils/comment')
var ObjectId = Schema.ObjectId;
const postSchema = new Schema({
    description: {
        type: String,
      },
      author_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Profile",
        required:true
      },
      imageUrl: {
        type: String,
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
module.exports = mongoose.model('posts',postSchema)