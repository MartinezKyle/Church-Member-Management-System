const db = require("../models/db.js");
const Admin = require("../models/AdminModel.js");

const register_admin_controller = {
    getCheckPhone: function(req, res) {
		db.findOne(Admin, { phonenum: req.query.q }, null, (data) => {
			res.send(data);
		});
		
    },

    getAdd: function(req, res) {
        db.insertOne(Admin, req.query, (data) => {
            console.log("User Added");
        });
    },

    addMultiple: function(req, res) {
        db.insertMany(Admin, req.body, (result) =>{
            console.log(result);
        });
    }
};
module.exports = register_admin_controller;