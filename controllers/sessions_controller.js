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
            if (data){
                console.log("Session Exists");
                console.log(data);
            }
            else{
                db.insertOne(Session, {date: today, session: session}, (data2) => {
                    console.log("Session Added");
                    console.log(data2);
                });
            }
            
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

    generateReport: function(req, res) {
        db.findMany(Session, {}, null, (data) => {
            // TODO: NOT DONE HERE, DATE FORMATTING
            /*
            var i;
            var stringDate = [];
            for (i = 0; i < data.length; i++) {
                if (data[i].date.getMonth() < 9 && data[i].date.getDate() < 10){
                    stringDate[i] = data[i].date.getFullYear() + "-0" + (data[i].date.getMonth() + 1) + "-0" + data[i].date.getDate();
                }
                else if (data[i].date.getMonth() < 9 && data[i].date.getDate() > 10){
                    stringDate[i] = data[i].date.getFullYear() + "-0" + (data[i].date.getMonth() + 1) + "-" + data[i].date.getDate();
                }
                else if (data[i].date.getMonth() > 9 && data[i].date.getDate() < 10){
                    stringDate[i] = data[i].date.getFullYear() + "-" + (data[i].date.getMonth() + 1) + "-0" + data[i].date.getDate();
                }
                else{
                    stringDate[i] = data[i].date.getFullYear() + "-" + (data[i].date.getMonth() + 1) + "-" + data[i].date.getDate();
                }
            }
            console.log(stringDate);
            for (i = 0; i < stringDate.length; i++) {
                data[i].date = data[i].ymddate;
            }
            */
            res.send(data);
        });
    },
};

module.exports = sessions_controller;
