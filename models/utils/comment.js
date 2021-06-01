const mongoose = require("mongoose");

module.exports = {
  profile_id: {
    type: mongoose.Types.ObjectId,
    ref: "Profile",
    requried: true,
  },
  post_id:{
    type:mongoose.Types.ObjectId,
    ref:'posts',
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
}
