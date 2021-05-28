const mongoose = require("mongoose");

const requestsSchema = require("../utils/requests.js");
const requestedSchema = require("../utils/requested.js");
const Profile_Dp_Schema = require("../utils/profile_dps.js");
// const suggestionSchema = require('../utils/suggestions.js')
const friendsSchema = require('../utils/friends.js')


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
    website: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zip: {
        type: Number,
        required: true,
    },
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,//id from users model
        required: true,
    },
    profile_Dps: {
        type: String,
    },
    cover_pic: {
        type:String,
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
    friends: {
        type: [friendsSchema],//friends
        default: []
    },
    posts: {
        type: [{

            type: mongoose.Types.ObjectId,
            ref: "Profile",
            required: true,

        }],
        default: []
    },
    suggestions: {
        type: [friendsSchema],//total users  - friends - requests - requested - user - moderator
        default: [],
    }
});

module.exports = mongoose.model('Profile', ProfileSchema)