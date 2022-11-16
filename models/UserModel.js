var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    phonenum: {
        type: String,
        required: true,
        unique: true
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    birthdate: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    baptism: {
        type: String,
        required: true,
    },
    baptismdate: {
        type: Date,
        required: false,
    },
    baptismlocation: {
        type: String,
        required: false,
    }
});

module.exports = mongoose.model('User', UserSchema);