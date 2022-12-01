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
		
    },

    addMultiple: function(req, res) {
        db.insertMany(User, req.body, (result) =>{
            console.log(result);
        });
    },

    updateOne: function(req, res) {
        console.log(req.query.origphonenum);
        db.updateOne(User, {phonenum:req.query.origphonenum}, {$set: {phonenum: req.query.phonenum, lastname: req.query.lastname, firstname: req.query.firstname, birthdate: req.query.birthdate, address: req.query.address, gender: req.query.gender, baptism: req.query.baptism, baptismlocation: req.query.baptismlocation, baptismdate: req.query.baptismdate}},(result =>{
            res.send(result);
        }));
    }
};
module.exports = register_churchgoer_controller;