const db = require("../models/db.js");
const User = require("../models/UserModel.js");
const converter = require('csvtojson');

const register_churchgoer_controller = {
    addMembers: function(req, res) {
        db.insertOne(User, req.query, (data) => {
            res.render('./partials/members', req.query, (err, html) => {
                res.send(html);
            });
        });
    },
        
    getAdd: function(req, res) {
        db.insertOne(User, req.query, (data) => {
            console.log("User Added");
        });
    },
	
    getCheckPhone: function(req, res) {
		db.findOne(User, { phonenum: req.query.q }, null, (data) => {
			res.send(data);
		});
		
    },

    addMultiple: function(req, res) {
        if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        }
        var files = req.files.csv;
        console.log(files.name);
        console.log(typeof(files));

        /*db.insertMany(User, req.query.docs, (result) =>{
            console.log(result);
        });*/
    }
};
module.exports = register_churchgoer_controller;