const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
  name: String,
  data: Buffer,
  contentType: String,
  uploaded_Date: {
    type: Date,
    default: Date.now(),
  },
});

