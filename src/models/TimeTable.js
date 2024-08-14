const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
    classroom: {
        type: String,
        required: true,
    },
    schedule: [
        {
            day: {
                type: String,
                required: true,
                enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            },
            sessions: [
                {
                    startTime: {
                        type: String,
                        required: true,
                    },
                    endTime: {
                        type: String,
                        required: true,
                    },
                    subject: {
                        type: String,
                        required: true,
                    },
                    teacher: {
                        type: String,
                        required: true,
                    },
                },
            ],
        },
    ],
});

const Timetable = mongoose.model('Timetable', timetableSchema);

module.exports = Timetable;
