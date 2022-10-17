const { Timestamp } = require('mongodb');
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
    middleinitial: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    logtime: {
        type: Date,
        required: true,
    }
});

module.exports = mongoose.model('Attendance', AttendanceSchema);