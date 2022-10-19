const db = require("../models/db.js");
const Session = require("../models/SessionModel");
const Attendance = require("../models/AttendanceModel.js");

const sessions_controller = {
    findSession: function(req,res) {
        var temptoday = new Date();
        var month = temptoday.getMonth();
        var day = temptoday.getDate();
        var year = temptoday.getFullYear();
        var session = req.query.session;
        var today = new Date(year, month, day, 0, 0, 0);
        console.log("Existing: ");
        db.findOne(Session, {date: today, session: session}, null, (data) => {
            console.log(data);
            if (!data){
                db.insertOne(Session, {date: today, session: session}, (data) => {
                    console.log("User Added");
                });
            }
        });
    },
    deleteSession: function (req, res) {
        var session = req.query.session;
        var date = new Date(req.query.date);
        console.log("deleted");
        db.deleteOne (Session, {date: date, session: session}, result => {
            console.log("deleted");
        });
        db.deleteMany (Attendance, {date: date, session: session}, result =>{
            console.log("deleted");
        });
        res.redirect("/sessions");
    },
};

module.exports = sessions_controller;