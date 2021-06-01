const cloudinary = require('cloudinary').v2
const fs = require('fs')
require('dotenv').config()
cloudinary.config({
    cloud_name: 'buzzz',
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});



module.exports = { cloudinary }