const mongoose = require('mongoose')
const { Schema } = mongoose;
const likeSchema = require('../utils/like')
const commentSchema = require('../utils/comment')
const flaggedSchema = require('../utils/flagged')
var ObjectId = Schema.ObjectId;
const postSchema = new Schema({
  description: {
    type: String,
  },
  author_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Profile",
    required: true
  },
  imageUrl: {
    type: String,
  },
  likes: {
    type: [likeSchema],
    default: [],
  },
  dislikes: {
    type: [likeSchema],
    default: [],
  },
  flagged: {
    type:[flaggedSchema],
    default:[]
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
module.exports = mongoose.model('posts', postSchema)