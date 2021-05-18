const mongoose = require("mongoose");

const requestsSchema = require("requests.js");
const requestedSchema = require("requested.js");
const Profile_Dp_Schema = require("profile_dps.js");
const suggestionSchema = require('suggestions.js')
const friendsSchema = require('friends.js')


let ProfileSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
    },
    lastname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
    },
    dob: {
        type: Date,
    },
    gender: {
        type: String,
        required: true,
    },
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,//id from users model
        required: true,
    },
    profile_Dps: {
        type: [Profile_Dp_Schema],
        default: [],
    },
    cover_pic: {
        data: Buffer,
        contentType: String,
        default: {},
    },
    about: {
        type: String,
        default: "",
    },
    requested: {
        type: [requestedSchema],//whom user has requested
        default: [],
    },
    requests: {
        type: [requestsSchema],//pending requests
        default: [],
    },
    friends:{
        type:[friendsSchema],//friends
        default:[]
    },
    suggestions:{
        type: [suggestionSchema],//total users  - friends - requests - requested - user - moderator
        default:[],
    }
});

module.exports = ProfileSchema