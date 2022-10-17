const db = require("../models/db.js");
const User = require("../models/UserModel.js");

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

    loadRegister: (req, res) =>{
        res.render("register", {
            title: "Register",
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
			console.log(tempArray);
            res.render("admin_homepage", { data: tempArray });
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
	
	//-----------------------Post Members Routing------------------------//
    addMembers: function(req, res) {
		console.log("Hello there2");
		var query = {postUsername: Username,
                     postTitle: req.query.postTitle,
                     desc: req.query.desc,
                     postPhoto: req.query.postPhoto};
		db.insertOne(User, query, (data) => {
			res.render('./partials/members', req.query, (err, html) => {
                res.send(html);
            });
		});
    },

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
    getAdd: function(req, res) {
		db.insertOne(User, req.query, (data) => {
			console.log("User Added");
		});
    },

	//-----------------------Login Routing----------------------------//
	/*
		Check if there is an account in the Database.
    */
    CheckLogin: function(req, res){
        db.findOne(User, { phonenum: req.query.phonenum, password: req.query.password }, null, (data) => {
			res.send(data);
		});
    }
};

module.exports = controller;
