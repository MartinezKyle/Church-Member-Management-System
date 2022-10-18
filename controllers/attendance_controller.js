const db = require("../models/db.js");
const User = require("../models/UserModel.js");
const Attendance = require("../models/AttendanceModel.js");

const attendance_controller = {
    addAttendance: function(req, res) {
        console.log("Hello there2");
        db.findOne(User, { phonenum: req.query.phonenum }, null, (data) => {
            today = new Date()
            var query ={
                phonenum: req.query.phonenum,
                session: req.query.session,
                firstname: data.firstname,
                lastname: data.lastname,
                date: today
            };
            db.insertOne(Attendance, query, (data) => {
                console.log(data)
            });
        });
    }
};

module.exports = attendance_controller;