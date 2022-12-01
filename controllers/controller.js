const db = require("../models/db.js");
const User = require("../models/UserModel.js");
const Attendance = require("../models/AttendanceModel.js");
const Session = require('../models/SessionModel.js');
const Admin = require('../models/AdminModel.js');
var phonenum = null;
var loggedin = false;

const controller = {
	//-----------------------Handlebars Routing----------------------------//
    redirectHP: (req, res) => {
        res.redirect("/getIndex");
    },
	
	getIndex: function (req, res) {
        res.render("login", { 
			title: "Login",
            customCSS: '<link rel="stylesheet" href="CSS/login.css">'
		});
    },

    loadLogin: (req, res) => {
        res.render("login", {
            title: "Login",
            customCSS: '<link rel="stylesheet" href="CSS/login.css">'
        });
    },

    loadRegisterChurchgoer: (req, res) => {
        res.render("register_churchgoer", {
            title: "Register",
            customCSS: '<link rel="stylesheet" href="CSS/register.css">'
        });
    },

    loadRegisterModerator: (req, res) => {
        res.render("register_moderator", {
            title: "Register Moderator",
            customCSS: '<link rel="stylesheet" href="CSS/register.css">'
        });
    },
	
	loadMembers: function (req, res) {
		console.log("Hello there");
        db.findMany(User, {}, null, (data) => {
			const tempArray = [];
			if (data.length !== 0){
				data.forEach(doc => tempArray.push(doc.toObject()));
			}
            db.countDocuments(User, {}, (count) => {
                console.log(tempArray);
                console.log(count);
                res.render("admin_homepage", { data: tempArray, count});
            });
			
        });
    },

    loadMembers2: function (req, res) {
		console.log("Hello there");
        db.findMany(User, {baptism: "Unbaptized"}, null, (data) => {
			const tempArray = [];
			if (data.length !== 0){
				data.forEach(doc => tempArray.push(doc.toObject()));
			}
            db.countDocuments(User, {}, (count) => {
                console.log(tempArray);
                console.log(count);
                res.render("admin_homepage", { data: tempArray, count});
            });
			
        });
    },

    loadMembers3: function (req, res) {
		console.log("Hello there");
        db.findMany(User, {baptism: "Infant Baptism"}, null, (data) => {
			const tempArray = [];
			if (data.length !== 0){
				data.forEach(doc => tempArray.push(doc.toObject()));
			}
            db.countDocuments(User, {}, (count) => {
                console.log(tempArray);
                console.log(count);
                res.render("admin_homepage", { data: tempArray, count});
            });
			
        });
    },

    loadMembers4: function (req, res) {
		console.log("Hello there");
        db.findMany(User, {baptism: "Water Baptism"}, null, (data) => {
			const tempArray = [];
			if (data.length !== 0){
				data.forEach(doc => tempArray.push(doc.toObject()));
			}
            db.countDocuments(User, {}, (count) => {
                console.log(tempArray);
                console.log(count);
                res.render("admin_homepage", { data: tempArray, count});
            });
			
        });
    },

    loadModerators: (req, res) => {
        console.log("Hello there");
        db.findMany(Admin, {}, null, (data) => {
			const tempArray = [];
			if (data.length !== 0){
				data.forEach(doc => tempArray.push(doc.toObject()));
			}
            db.countDocuments(User, {}, (count) => {
                console.log(tempArray);
                console.log(count);
                res.render("moderators_list", { data: tempArray, count});
            });
			
        });
    },

    loadProfile: (req, res) => {
        var phonenum = req.query.phonenum;
         db.findOne(User, {phonenum: phonenum}, {_id: 0, lastname: 1, firstname: 1, phonenum: 1, ymdbirthdate: {$dateToString: {format: "%Y-%m-%d", date: "$birthdate" }}, address: 1, gender: 1, status: 1, baptism: 1, ymdbaptismdate: {$dateToString: {date: "$baptismdate", format: "%Y-%m-%d" }}, baptismlocation: 1}, (result) => {
            if (!result){
                res.sendStatus(404);
            }
            else{
                var profile = result.toObject();
                var baptstatid;
                var bapthidden;
                var baptdisabled;
                if (profile.baptism == "Unbaptized"){
                    baptstatid = "ub";
                    bapthidden = "hidden";
                    baptdisabled = "disabled";
                }
                else if (profile.baptism == "Infant Baptism"){
                    baptstatid = "ib";
                    bapthidden = "";
                    baptdisabled = "";
                }
                else if (profile.baptism == "Water Baptism"){
                    baptstatid = "wb";
                    bapthidden = "";
                    baptdisabled = "";
                }
                res.render("profile", {lastname: profile.lastname, firstname: profile.firstname, phonenum: profile.phonenum, birthdate: profile.ymdbirthdate, address: profile.address, gender: profile.gender, status: profile.status, baptism: profile.baptism, baptismdate: profile.ymdbaptismdate, baptismlocation: profile.baptismlocation, baptstatid:baptstatid, bapthidden:bapthidden, baptdisabled: baptdisabled});
            }
        });
    },
	
	loadAdminHP: (req, res) =>{
        res.render("admin_homepage", {
            title: "Admin Homepage"
        });
    },
	
    getFavicon: function (req, res) {
        res.status(204);
    },
	
	loadAttendance: (req, res) =>{
        res.render("attendance", {
            title: "Attendance",
            customCSS: '<link rel="stylesheet" href="CSS/register.css">'
        });
    },

    loadSessions: (req, res) => {
        db.findMany(Session, {}, {_id: 0, ymddate: { $dateToString: {date: "$date", format: "%Y-%m-%d" }}, session: 1}, (data) => {
			const tempArray = [];
			if (data.length !== 0){
				data.forEach(doc => tempArray.push(doc.toObject()));
			}
            db.countDocuments(Session, {}, (count) => {
                console.log(tempArray);
                console.log(count);
                res.render("sessions_repo", { data: tempArray, count });
            });
            
        });
    },

    loadSessions2: (req, res) => {
        db.findMany(Session, {session: "MorningSession"}, {_id: 0, ymddate: { $dateToString: {date: "$date", format: "%Y-%m-%d" }}, session: 1}, (data) => {
			const tempArray = [];
			if (data.length !== 0){
				data.forEach(doc => tempArray.push(doc.toObject()));
			}
            db.countDocuments(Session, {}, (count) => {
                console.log(tempArray);
                console.log(count);
                res.render("sessions_repo", { data: tempArray, count });
            });
            
        });
    },

    loadSessions3: (req, res) => {
        db.findMany(Session, {session: "AfternoonSession"}, {_id: 0, ymddate: { $dateToString: {date: "$date", format: "%Y-%m-%d" }}, session: 1}, (data) => {
			const tempArray = [];
			if (data.length !== 0){
				data.forEach(doc => tempArray.push(doc.toObject()));
			}
            db.countDocuments(Session, {}, (count) => {
                console.log(tempArray);
                console.log(count);
                res.render("sessions_repo", { data: tempArray, count });
            });
            
        });
    },

    loadSessions4: (req, res) => {
        db.findMany(Session, {session: "LifeJourney"}, {_id: 0, ymddate: { $dateToString: {date: "$date", format: "%Y-%m-%d" }}, session: 1}, (data) => {
			const tempArray = [];
			if (data.length !== 0){
				data.forEach(doc => tempArray.push(doc.toObject()));
			}
            db.countDocuments(Session, {}, (count) => {
                console.log(tempArray);
                console.log(count);
                res.render("sessions_repo", { data: tempArray, count });
            });
            
        });
    },

    loadSessionAttendance: (req, res) =>{
        var date = new Date(req.query.date);
        db.findMany(Attendance, {date: date, session: req.query.session}, {_id: 0, lastname: 1, firstname:1, baptism: 1, session: 1, ymddate: { $dateToString: {date: "$date", format: "%Y-%m-%d" }}, time: {$dateToString: {date: "$logtime", format: "%H:%M:%S", timezone: "+08:00" }}, phonenum: 1}, (data) => {
            const tempArray = [];
			if (data.length !== 0){
				data.forEach(doc => tempArray.push(doc.toObject()));
			}
            db.countDocuments(Attendance, {date: date, session: req.query.session}, (count) => {
                console.log(tempArray);
                console.log(count);
                res.render("session", { data: tempArray, count });
            });
        });
    },

    /*
        Stores the username used in the login for future use.
    */ 
    AllowLogin: function(req, res) {
        phonenum = req.query.phonenum;
        console.log(phonenum);
        loggedin = true;
        res.sendStatus(200);
    },

    /*
        Resets values that indicate a user is logged in.
    */ 
    Logout: function(req, res){
        phonenum = null;
        loggedin = false;
        res.redirect('/login');
    },
	
	//-----------------------Post Members Routing------------------------//
    

	//-----------------------Register Routing----------------------------//
	
    /*
		Check if username exists in the database
    */
	/*
    getCheckUsername: function(req, res) {
		console.log("Hello2");
		db.findOne(Register, { username: req.query.q }, null, (data) => {
			res.send(data);
		});
		
    },
	*/
	
    /*
		Add account in the Database
    */
	
	

	//-----------------------Login Routing----------------------------//
	/*
		Check if there is an account in the Database.
    */

};

module.exports = controller;
