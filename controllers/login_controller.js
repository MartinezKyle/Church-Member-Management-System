const db = require("../models/db.js");
const Admin = require("../models/AdminModel.js");

const login_controller = {
    CheckLogin: function(req, res){
		console.log(req.session.pnum);
		if(req.session.pnum)
			res.redirect('/loadMembers');
		else {
			db.findOne(Admin, { phonenum: req.query.phonenum, password: req.query.password}, null, (data) => {
				if(data)
					req.session.pnum = data.phonenum;
				res.send(data);
			});
		}
    }
};

module.exports = login_controller;