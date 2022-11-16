const db = require("../models/db.js");
const Admin = require("../models/AdminModel.js");

const login_controller = {
    CheckLogin: function(req, res){
        db.findOne(Admin, { phonenum: req.query.phonenum, password: req.query.password}, null, (data) => {
			res.send(data);
		});
    }
};

module.exports = login_controller;