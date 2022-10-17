const { Timestamp } = require('mongodb');
var mongoose = require('mongoose');

var AttendanceSchema = new mongoose.Schema({
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
    },
	date: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
