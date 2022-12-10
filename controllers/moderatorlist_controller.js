const db = require("../models/db.js");
const Admin = require("../models/AdminModel.js");

const moderatorlist_controller = {
    deleteModerator: function (req, res) {
        var phonenum = req.query.phonenum;
        console.log("deleting: " + phonenum);
        db.deleteOne (Admin, {phonenum: phonenum}, result => {
            res.send(result);
        });
        //res.redirect("/load_moderators");
    },
    updateOne: function(req, res) {
        console.log(req.query.origphonenum);
        db.updateOne(Admin, {phonenum:req.query.origphonenum}, {$set: {phonenum: req.query.phonenum, lastname: req.query.lastname, firstname: req.query.firstname, password: req.query.password}},(result =>{
            res.send(result);
        }));
    }
};

module.exports = moderatorlist_controller;