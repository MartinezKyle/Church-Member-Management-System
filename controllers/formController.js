const Connection = require('mysql/lib/Connection');
const db = require('../models/model.js');

db.connect(function(err) {
    if (err) {
        isOnline = false;
    }   
    else
    {
        isOnline = true;
        console.log("Connected");
    }
});

const controller = {
    getDepartments: function(req, res){
        var division_id = req.query.division;
        var division;
        if (division_id == "0"){
            division = `cop`;
        }
        if (division_id == "1"){
            division = `cs`;
        }
        if (division_id == "2"){
            division = `fin`;
        }
        if (division_id == "4"){
            division = `ops`;
        }
        var sql = `SELECT * FROM ` + division;
        db.query(sql, function(err, results){
            res.send(results);
        });
    },

    getSubCategory: function(req, res){
        var category_code = req.query.category_code;
        var table = "";
            if (category_code == 0)
                table = `admin`;
            if (category_code == 1)
                table = `kiosks`;
            if (category_code == 2)
                table = `crm`;
            if (category_code == 3)
                table = `paybills`;
            if (category_code == 4)
                table = `ccms`;
            if (category_code == 5)
                table = `ddms`;
            var sql = `SELECT * FROM ` + table + ` WHERE id > 0`;
            db.query(sql, function(err, results){
                if (err){
                    console.log(err);
                }
                res.send(results);
            });
    },

    getForm: function (req, res) {
        var sql = `SELECT * FROM division`;
        db.query(sql, function(err, results){
            if (err){
                console.log(err);
            }
            var division = results;
            sql = "SELECT * FROM property"
            db.query(sql, function(err, results) {
                if (err){
                    console.log(err);
                } 
                var property = results;
                sql = "SELECT * FROM ifaecategory"
                db.query(sql, function(err, results) {
                    if (err){
                        console.log(err);
                    } 
                    var category = results;
                    res.render('form', {division: division, property:property, category:category});
                });
            });
        });
    },

    submitForm: function (req, res) {
        var name = req.body.name;
        var date = req.body.date;
        var email_address = req.body.email_address;
        var division_id = parseInt(req.body.division);
        var department_id = parseInt(req.body.department);
        var property_id = parseInt(req.body.property);
        var ifae_id = parseInt(req.body.ifaecategory);
        var subcategory_id = parseInt(req.body.subcategory);
        var others = (req.body.other == "" || req.body.other == '' || req.body.other == null) ? null : req.body.other;
        var concern = (req.body.concern == "" || req.body.concern == '' || req.body.concern == null) ? null : req.body.concern;
        var sql = "CALL insert_concerns(?,?,?,?,?,?,?,?,?,?);";
        db.query(sql, [name, date, email_address,division_id, department_id, property_id, ifae_id, subcategory_id, others, concern], function (err, results){
            if (err)
                console.log(err);
            res.send({control_number: results[0][0].control_number, result: (err ? false : true)});
        });
    }
    /*submitForm: function (req, res) {
        var sqlInsert = "INSERT INTO concerns SET ?";
        var today = new Date();
        var sql = `SELECT * FROM concerns WHERE control_number REGEXP '^[ITRF` + today.getFullYear() + `]' ORDER BY control_number DESC LIMIT 1`
        db.query(sql, function(err, results){
            var newctr = "";
            if (results.reduce((a, obj) => a + Object.keys(obj).length, 0) == 0){
                newctr = "ITRF" + today.getFullYear() + "00000";
            }
            else{
                var lastctr = results[0].control_number;
                newctr = "ITRF" + today.getFullYear() + ("00000" + (parseInt(lastctr.slice(-5)) + 1).toString()).slice(-5);
            }
            var control_number = newctr; //"ITRF202300000";
            var timestamp = today.toISOString().slice(0, 19).replace('T', ' ');
            var name = req.body.name;
            var date = req.body.date;
            var email_address = req.body.email_address;
            var division_id = req.body.division;
            var cop_id = division_id == 0 ? req.body.department : null;
            var cs_id = division_id == 1 ? req.body.department : null;
            var fin_id = division_id == 2 ? req.body.department : null;
            var ops_id = division_id == 4 ? req.body.department : null;
            var property_id = req.body.property;
            var ifae_id = req.body.ifaecategory;
            var admin_id = ifae_id == 0 ? req.body.subcategory : null;
            var admin_others = ifae_id == 0 ? ((req.body.other == "" || req.body.other == '' || req.body.other == null) ? null : req.body.other) : null;
            var kiosks_id = ifae_id == 1 ? req.body.subcategory : null;
            var kiosks_others = ifae_id == 1 ? ((req.body.other == "" || req.body.other == '' || req.body.other == null) ? null : req.body.other) : null;
            var crm_id = ifae_id == 2 ? req.body.subcategory : null;
            var crm_others = ifae_id == 2 ? ((req.body.other == "" || req.body.other == '' || req.body.other == null) ? null : req.body.other) : null;
            var pb_id = ifae_id == 3 ? req.body.subcategory : null;
            var pb_others = ifae_id == 3 ? ((req.body.other == "" || req.body.other == '' || req.body.other == null) ? null : req.body.other) : null;
            var ccms_id = ifae_id == 4 ? req.body.subcategory : null;
            var ccms_others = ifae_id == 4 ? ((req.body.other == "" || req.body.other == '' || req.body.other == null) ? null : req.body.other) : null;
            var ddms_id = ifae_id == 5 ? req.body.subcategory : null;
            var ddms_others = ifae_id == 5 ? ((req.body.other == "" || req.body.other == '' || req.body.other == null) ? null : req.body.other) : null;
            var concern = (req.body.concern == "" || req.body.concern == '' || req.body.concern == null) ? null : req.body.concern;
            var ticket = {
                control_number: control_number,
                timestamp: timestamp,
                name: name,
                date: date,
                email_address: email_address,
                division_id: division_id,
                cop_id: cop_id,
                cs_id: cs_id,
                fin_id: fin_id,
                ops_id: ops_id,
                property_id: property_id,
                ifae_id: ifae_id,
                admin_id: admin_id,
                admin_others: admin_others,
                kiosks_id: kiosks_id,
                kiosks_others: kiosks_others,
                crm_id: crm_id,
                crm_others: crm_others,
                pb_id: pb_id,
                pb_others: pb_others,
                ccms_id: ccms_id,
                ccms_others: ccms_others,
                ddms_id: ddms_id,
                ddms_others: ddms_others,
                concern: concern,
                status_id: 2,
                isLocked: 0
            };
            
            db.query(sqlInsert, ticket, function (err, results1) {
                res.send({control_number: newctr, result: (err ? false : true)});
            });
        });
    }*/
};

module.exports = controller;