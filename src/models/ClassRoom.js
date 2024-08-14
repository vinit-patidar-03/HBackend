const mongoose = require('mongoose');

const ClassRoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    days: {
        type: [String],
        required: true,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    students: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: []
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const ClassRoomModel = mongoose.model('ClassRoom', ClassRoomSchema);
module.exports = ClassRoomModel;
