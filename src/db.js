const mongoose = require('mongoose');

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.Mongo_URI);

        mongoose.connection.on('connected', () => {
            console.log('Connected to MongoDB');
        });
    } catch (error) {
        console.error(error);
    }
}

module.exports = connectToDB;