const cloudinary = require('cloudinary').v2
const fs = require('fs')
require('dotenv').config()
cloudinary.config({
    cloud_name: 'buzzz',
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const download = require('./utils/img-downloader')
const save = async (profile) => {

    await download(profile.photos[0].value, './temp_img/img.png', function () {
        console.log('done');
    });
    try {
        await cloudinary.uploader.upload("./temp_img/img.png", function (error, result) {
            return result.url;
        });
    }
    catch (err) {
        throw err
    }
    fs.unlink('./temp_img/img.png', (err) => {
        if (err) throw err
    })
}
module.exports = { save }