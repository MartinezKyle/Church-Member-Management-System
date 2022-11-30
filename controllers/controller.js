const db = require("../models/db.js");
const User = require("../models/UserModel.js");
const Attendance = require("../models/AttendanceModel.js");
const Session = require('../models/SessionModel.js');
const Admin = require('../models/AdminModel.js');
const controller = {
	//-----------------------Handlebars Routing----------------------------//
    redirectHP: (req, res) => {
        res.redirect("/getIndex");
    },
	
	getIndex: function (req, res) {
		console.log("getIndex: " + req.session.pnum);
		if(req.session.pnum)
			res.redirect('/loadMembers');
		else
			res.render("login", { 
				title: "Login",
				customCSS: '<link rel="stylesheet" href="CSS/login.css">'
			});
    },

    loadLogin: (req, res) => {
		console.log("loadLogin: " + req.session.pnum);
		if(req.session.pnum)
			res.redirect('/loadMembers');
		else
			res.render("login", {
				title: "Login",
				customCSS: '<link rel="stylesheet" href="CSS/login.css">'
			});
    },

    loadRegisterChurchgoer: (req, res) => {
		if(req.session.pnum)
			res.render("register_churchgoer", {
				title: "Register",
				customCSS: '<link rel="stylesheet" href="CSS/register.css">'
			});
		else
			res.redirect('/login');
    },

    loadRegisterModerator: (req, res) => {
		if(req.session.pnum)
			res.render("register_moderator", {
				title: "Register Moderator",
				customCSS: '<link rel="stylesheet" href="CSS/register.css">'
			});
		else
			res.redirect('/login');
    },
	
	loadMembers: function (req, res) {
		console.log("Hello there");
		if(req.session.pnum)
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
		else	
			res.redirect('/login');
    },

    loadModerators: (req, res) => {
		if(req.session.pnum)
			res.render("moderators_list", {
				title: "Moderators",
				customCSS: '<link rel="stylesheet" href="CSS/table.css">'
			});
		else
			res.redirect('/login');
    },

    loadProfile: (req, res) => {
		if(req.session.pnum)
			res.render("profile", {
				title: "Profile",
				customCSS: '<link rel="stylesheet" href="CSS/profile.css">'
			});
		else
			res.redirect('/login');
    },
	
	loadAdminHP: (req, res) =>{
		if(req.session.pnum)
			res.render("admin_homepage", {
				title: "Admin Homepage"
			});
		else	
			res.redirect('/login');
    },
	
    getFavicon: function (req, res) {
        res.status(204);
    },
	
	loadAttendance: (req, res) =>{
		if(req.session.pnum)
			res.render("attendance", {
				title: "Attendance",
				customCSS: '<link rel="stylesheet" href="CSS/register.css">'
			});
		else	
			res.redirect('/login');
    },

    loadSessions: (req, res) => {
		if(req.session.pnum)
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
		else	
			res.redirect('/login');
    },

    loadSessionAttendance: (req, res) =>{
		if(req.session.pnum) {
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
		} else	
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
