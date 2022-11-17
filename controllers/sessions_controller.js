const db = require("../models/db.js");
const Session = require("../models/SessionModel");
const Attendance = require("../models/AttendanceModel.js");

const sessions_controller = {
    addSession: function(req,res) {
        var temptoday = new Date();
        var month = temptoday.getMonth();
        var day = temptoday.getDate();
        var year = temptoday.getFullYear();
        var session = req.query.session;
        var today = new Date(year, month, day, +8, 0, 0);
        db.findOne(Session, {date: today, session: session}, null, (data) => {
            console.log(data);
            if (!data){
                db.insertOne(Session, {date: today, session: session}, (data) => {
                    console.log("Session Added");
                });
            }
            else
                console.log("Session Exists")
        });
    },
    deleteSession: function (req, res) {
        var session = req.query.session;
        var date = new Date(req.query.date);
        db.deleteOne (Session, {date: date, session: session}, result => {
            if (result)
                console.log("deleted");
            else
                console.log("fail");
        });
        db.deleteMany (Attendance, {date: date, session: session}, result =>{
            console.log("deleted");
        });
        res.redirect("/sessions");
    },
};

module.exports = sessions_controller;