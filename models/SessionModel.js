var mongoose = require('mongoose');
const { Timestamp } = require('mongodb');

var SessionSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    
    session: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Session', SessionSchema);