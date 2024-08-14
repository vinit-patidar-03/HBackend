const mongoose = require('mongoose');
const User = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        default: 'https://cdn-icons-png.flaticon.com/512/3237/3237472.png'
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    classRoom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ClassRoom',
        default: null
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
})

const UserModel = mongoose.model('User', User);
module.exports = UserModel;