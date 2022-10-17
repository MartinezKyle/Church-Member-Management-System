var mongoose = require('mongoose');

var AttendanceSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
        unique: true
    },
    session: {
        type: String,
        required: true
    },
    phonenum: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Attendance', AttendanceSchema);