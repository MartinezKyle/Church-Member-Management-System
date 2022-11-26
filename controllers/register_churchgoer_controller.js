const db = require("../models/db.js");
const User = require("../models/UserModel.js");

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
		
    }
};
module.exports = register_churchgoer_controller;