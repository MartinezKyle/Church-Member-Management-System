const db = require("../models/db.js");
const User = require("../models/UserModel.js");
const Attendance = require("../models/AttendanceModel.js");

const attendance_controller = {
    addAttendance: function(req, res) {
        db.findOne(User, { phonenum: req.query.phonenum }, null, (data) => {
            day = new Date();
            today = new Date(day.getFullYear(), day.getMonth(), day.getDate(), +8, 0, 0);
            var query ={
                phonenum: req.query.phonenum,
                session: req.query.session,
                firstname: data.firstname,
                lastname: data.lastname,
                baptism: data.baptism,
                date: today,
                logtime: day
            };
            console.log(query);
            db.insertOne(Attendance, query, (data) => {
                console.log(data)
            });
        });
    },

    deleteAttendance: function(req, res) {
        var date = new Date(req.query.date);
        db.deleteOne(Attendance, {date: date, session: req.query.session, phonenum: req.query.phonenum}, result =>{
            
            var url = "/sessionAttendance?date=" + req.query.date + "&session=" + req.query.session
            res.redirect(url);
        });
    },
	
    getCheckAttendance: function(req, res) {
        day = new Date();
        today = new Date(day.getFullYear(), day.getMonth(), day.getDate(), +8, 0, 0);
		db.findOne(Attendance, { phonenum: req.query.phonenum, session: req.query.session, date: today }, null, (data) => {
			res.send(data);
		});
		
    }
};

module.exports = attendance_controller;