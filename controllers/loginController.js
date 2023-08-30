const Connection = require('mysql/lib/Connection');
const db = require('../models/model.js');

const loginController = {
    checkLogin: function(req,res) {
        var sql = `SELECT * FROM qaqc WHERE email = '` + req.body.email + `'AND password = '` + req.body.password + `'`;
        db.query(sql, function(err, results){
            console.log(results);
            res.send(results.length == 1);
        });
    },

    getDetails: function(req, res){
        var sql = `SELECT * FROM qaqc WHERE email = '` + req.query.email + `'AND password = '` + req.query.password + `'`;
        db.query(sql, function(err, results){
            res.send(results);
        });
    }
};

module.exports = loginController;