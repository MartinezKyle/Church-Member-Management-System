const Connection = require('mysql/lib/Connection');
const db = require('../models/model.js');
var isOnline = false;
const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session'); 

db.connect(function(err) {
    if (err) {
        console.log(err);
        isOnline = false;
    }   
    else
    {
        isOnline = true;
        console.log("Connected");
    }
});

const controller = {
    getIndex: function (req, res) {
        res.render("index");
    },

    createSession: function (req,res) {
        console.log(req.session);
        var session = req.session;
        session.userid = req.body.id;
        session.name = req.body.name;
        session.email = req.body.email;
        console.log(req.session);
        res.sendStatus(200);
    },

    destroySession: function(req, res) {
        req.session.destroy();
        res.redirect("/login");
    },

    getLogin: function (req, res) {
        console.log(req.session);
        if(!req.session || !req.session.userid){
            res.render("login");
        }
        else
            res.redirect("/home");
            
    },
    
    getHome: function(req, res) {
        if(!req.session || !req.session.userid){
            res.redirect("/login");
        }
        else{
            var sql = `SELECT * FROM home_table`
            db.query(sql, function(err, result) {
                if (err)
                    console.log(err);
                var concern = result
                sql = "SELECT * FROM property"
                db.query(sql, function(err, results) {
                    if (err){
                        console.log(err);
                    } 
                    var property = results;
                    sql = "SELECT * FROM status"
                    db.query(sql, function(err, results) {
                        if (err){
                            console.log(err);
                        } 
                        var status = results;
                        sql = `SELECT q.id, q.name FROM qaqc q UNION ALL SELECT NULL, "Unassigned";`
                        db.query(sql, function(err, results) {
                            if (err){
                                console.log(err);
                            } 
                            var qaqc = results;
                            var sql = `SELECT DATE_FORMAT(c.timestamp, "%Y-%m-%d") as timestamp FROM concerns c ORDER BY timestamp ASC LIMIT 1`
                            db.query(sql, function(err, result) {
                                if (err)
                                    console.log(err);
                                if (result.length != 0)
                                    var startdate = result[0].timestamp;
                                else
                                    new Date().toISOString().slice(0, 10);
                                var enddate = new Date().toISOString().slice(0, 10)
                                sql = "SELECT * FROM ifaecategory"
                                db.query(sql, function(err, results) {
                                    if (err){
                                        console.log(err);
                                    } 
                                    var ifaecategory = results;
                                    res.render('home', {concern:concern, property:property, status: status, qaqc:qaqc, startdate: startdate, enddate:enddate, ifaecategory:ifaecategory});
                                });
                            });
                        });
                    });
                });
            });
        }
    },

    getHomeFilter: function(req, res) {
        var property_filter = '';
        var status_filter = '';
        var qaqc_filter = '';
        var ifaecategory_filter = '';
        var start_date_filter = '';
        var end_date_filter = '';
        if(req.query.property_id!=undefined){    
            req.query.property_id.forEach(element => {
                property_filter += (property_filter == "" ? "AND (" : " OR ") + "c.property_id = " + element;
            });
            property_filter += ") "
        }

        if(req.query.status_id!=undefined){    
            req.query.status_id.forEach(element => {
                status_filter += (status_filter == "" ? "AND (" : " OR ") + "c.status_id = " + element;
            });
            status_filter += ") "
        }

        if(req.query.qaqc_id!=undefined){    
            req.query.qaqc_id.forEach(element => {
                qaqc_filter += (qaqc_filter == "" ? "AND (" : " OR ") + "c.qaqc_id " + (element == '' ? "IS NULL" : ("= " + element));
            });
            qaqc_filter += ") "
        }
        if(req.query.ifaecategory_id!=undefined){    
            req.query.ifaecategory_id.forEach(element => {
                ifaecategory_filter += (ifaecategory_filter == "" ? "AND (" : " OR ") + "c.ifae_id " + (element == '' ? "IS NULL" : ("= " + element));
            });
            ifaecategory_filter += ") "
        }
        if((req.query.start_date) != '' && (req.query.start_date) != null)
            start_date_filter = `AND c.timestamp >= "` + req.query.start_date + `" `;

        if((req.query.end_date) != ''&& (req.query.end_date) != null)
            end_date_filter = `AND c.timestamp <= "` + req.query.end_date + `" `;
        
        var sql = `SELECT c.control_number, CONCAT(YEAR(c.timestamp), "/", LPAD(MONTH(c.timestamp), 2, 0) , "/", LPAD(DAY(c.timestamp), 2, 0), " ", LPAD((HOUR(c.timestamp) + 8), 2, 0), ":", LPAD(MINUTE(c.timestamp), 2, 0), ":", LPAD(SECOND(c.timestamp), 2, 0)) as timestamp, c.email_address, p.property, c.concern, s.status, s.color_class FROM concerns c, property p, status s WHERE c.property_id = p.id ` + property_filter + qaqc_filter + ifaecategory_filter + status_filter + start_date_filter + end_date_filter + `AND c.status_id = s.id`;
        console.log(sql);
        db.query(sql, function(err, result) {
            if (err)
                console.log(err);
            res.send(result);
        });
    },
    
    getReport: function(req, res){
        if(!req.session || !req.session.userid){
            res.redirect("/login");
        }
        else{
            var sql = `SELECT DATE_FORMAT(c.timestamp, "%Y-%m-%d") as timestamp FROM concerns c ORDER BY timestamp ASC LIMIT 1`
            db.query(sql, function(err, result) {
                if (err)
                    console.log(err);
                res.render('report', {startdate:result[0].timestamp, enddate: new Date().toISOString().slice(0, 10)});
            });
        };
    },

    getStatusReport : function(req, res){
        var start_date = req.query.start_date;
        var end_date = req.query.end_date;
        var sql = `SELECT s.status, COUNT(c.control_number) AS count FROM status s LEFT JOIN (SELECT * FROM concerns c WHERE c.timestamp >= "` + start_date + `" AND c.timestamp <= "` + end_date + `") c ON s.id = c.status_id GROUP BY s.id UNION ALL SELECT "Total" as status, COUNT(c.control_number) AS count FROM concerns c WHERE c.timestamp >= "` + start_date + `" AND c.timestamp <= "` + end_date + `"`;
        db.query(sql, function(err, result) {
            if (err)
                console.log(err);
            res.send(result);
        });
    },

    getCategoryReport : function(req, res){
        var start_date = req.query.start_date;
        var end_date = req.query.end_date;
        var sql = `SELECT i.shorthand, COUNT(c.control_number) as count FROM ifaecategory i LEFT JOIN (SELECT * FROM concerns c WHERE c.timestamp >= "` + start_date + `" AND c.timestamp <= "` + end_date + `") c ON i.id = c.ifae_id GROUP BY i.id UNION ALL SELECT "Total" as category, COUNT(c.control_number) as count FROM concerns c WHERE c.timestamp >= "` + start_date + `" AND c.timestamp <= "` + end_date + `";`;
        db.query(sql, function(err, result) {
            if (err)
                console.log(err);
            res.send(result);
        });
    },

    getErrorReport : function(req, res){
        var start_date = req.query.start_date;
        var end_date = req.query.end_date;
        var sql = `SELECT e.error, COUNT(c.control_number) AS count FROM error e LEFT JOIN (SELECT * FROM concerns c WHERE c.timestamp >= "` + start_date + `" AND c.timestamp <= "` + end_date + `") c  ON e.id = c.error_id GROUP BY e.id UNION ALL SELECT "Unassigned" as error, COUNT(c.control_number) AS count FROM concerns c WHERE c.error_id IS NULL AND c.timestamp >= "` + start_date + `" AND c.timestamp <= "` + end_date + `" GROUP BY c.error_id UNION ALL SELECT "Total" as error, COUNT(c.control_number) AS count FROM concerns c WHERE c.timestamp >= "` + start_date + `" AND c.timestamp <= "` + end_date + `";`;
        db.query(sql, function(err, result) {
            if (err)
                console.log(err);
            res.send(result);
        });
    },

    getTop5Report : function(req,res){
        var start_date = req.query.start_date;
        var end_date = req.query.end_date;
        var sql = `SELECT p.id, p.property, COUNT(c.control_number) AS count FROM property p LEFT JOIN (SELECT * FROM concerns c WHERE c.timestamp >= "` + start_date + `" AND c.timestamp <= "` + end_date + `") c ON p.id = c.property_id GROUP BY p.id HAVING count > 0 ORDER BY count DESC LIMIT 5;`;
        db.query(sql, function(err, result) {
            if (err)
                console.log(err);
            res.send(result);
        });
    },

    getTicket: function (req,res){
        console.log(req.session.userid + ", " + req.session.name + ", " + req.session.email);
        if(!req.session || !req.session.userid){
            res.redirect("/login");
        }
        else{
            var sql = `SELECT c.control_number, DATE_FORMAT(CONVERT_TZ(c.timestamp, '+00:00', '+08:00'), "%m/%d/%Y %H:%i:%S") as timestamp, c.name, DATE_FORMAT(CONVERT_TZ(c.date, '+00:00', '+08:00'), "%m/%d/%Y") as date, c.email_address, dv.division, CASE WHEN c.cop_id IS NOT NULL THEN (SELECT cp.department FROM concerns c, cop cp WHERE c.cop_id = cp.id AND c.control_number = "` + req.query.control_number + `") WHEN c.cs_id IS NOT NULL THEN (SELECT cs.department FROM concerns c, cs cs WHERE c.cs_id = cs.id AND c.control_number = "` + req.query.control_number + `") WHEN c.fin_id IS NOT NULL THEN (SELECT fn.department FROM concerns c, fin fn WHERE c.fin_id = fn.id AND c.control_number = "` + req.query.control_number + `") WHEN c.ops_id IS NOT NULL THEN (SELECT op.department FROM concerns c, ops op WHERE c.ops_id = op.id AND c.control_number = "` + req.query.control_number + `") END as department, p.property, ifae.category, CASE WHEN c.ifae_id = 0 THEN (SELECT ad.category FROM concerns c, admin ad WHERE c.admin_id = ad.id AND c.control_number = "` + req.query.control_number + `") WHEN c.ifae_id = 1 THEN (SELECT ki.category FROM concerns c, kiosks ki WHERE c.kiosks_id = ki.id AND c.control_number = "` + req.query.control_number + `") WHEN c.ifae_id = 2 THEN (SELECT cr.category FROM concerns c, crm cr WHERE c.crm_id = cr.id AND c.control_number = "` + req.query.control_number + `") WHEN c.ifae_id = 3 THEN (SELECT pb.category FROM concerns c, paybills pb WHERE c.pb_id = pb.id AND c.control_number = "` + req.query.control_number + `") WHEN c.ifae_id = 4 THEN (SELECT cc.category FROM concerns c, ccms cc WHERE c.ccms_id = cc.id AND c.control_number = "` + req.query.control_number + `") WHEN c.ifae_id = 5 THEN (SELECT dd.category FROM concerns c, ddms dd WHERE c.ddms_id = dd.id AND c.control_number = "` + req.query.control_number + `") END as subcategory, CASE WHEN c.ifae_id = 0 THEN (SELECT admin_others FROM concerns WHERE control_number = "` + req.query.control_number + `") WHEN c.ifae_id = 1 THEN (SELECT kiosks_others FROM concerns WHERE control_number = "` + req.query.control_number + `") WHEN c.ifae_id = 2 THEN (SELECT crm_others FROM concerns WHERE control_number = "` + req.query.control_number + `") WHEN c.ifae_id = 3 THEN (SELECT pb_others FROM concerns WHERE control_number = "` + req.query.control_number + `") WHEN c.ifae_id = 4 THEN (SELECT ccms_others FROM concerns WHERE control_number = "` + req.query.control_number + `") WHEN c.ifae_id = 5 THEN (SELECT ddms_others FROM concerns WHERE control_number = "` + req.query.control_number + `") END as other, c.concern, c.error_id, c.resolution, c.qaqc_id, c.priority_id, c.status_id, c.resolution, DATE_FORMAT(CONVERT_TZ(c.date_completed, '+00:00', '+08:00'), "%m/%d/%Y") as date_completed, c.isLocked, CASE WHEN c.division_id = 3 THEN "d-none" ELSE NULL END as hideDept, CASE WHEN (c.admin_id = 0 OR c.kiosks_id = 0 OR c.crm_id = 0 OR c.pb_id = 0 OR c.ccms_id = 0 OR c.ddms_id = 0) THEN NULL ELSE "d-none" END as hideOther FROM concerns c, division dv, property p, status s, ifaecategory ifae WHERE c.property_id = p.id AND c.status_id = s.id AND c.division_id = dv.id AND c.ifae_id = ifae.id AND c.control_number = "` + req.query.control_number + `"`;
            //var sql = `SELECT c.controlNumber, c.postDate, c.postTime, c.name, CONCAT(YEAR(c.date), "/", LPAD(MONTH(c.date), 2, 0) , "/", LPAD(DAY(c.date), 2, 0)) as date, c.emailAddress, dv.divisionName, CASE WHEN c.copDeptID IS NOT NULL THEN (SELECT cp.department FROM concerns c, cop cp WHERE c.copDeptID = cp.deptID AND c.controlNumber = "` + req.query.controlNumber + `") WHEN c.csDeptID IS NOT NULL THEN (SELECT cs.department FROM concerns c, cs cs WHERE c.csDeptID = cs.deptID AND c.controlNumber = "` + req.query.controlNumber + `") WHEN c.finDeptID IS NOT NULL THEN (SELECT fn.department FROM concerns c, fin fn WHERE c.finDeptID = fn.deptID AND c.controlNumber = "` + req.query.controlNumber + `") WHEN c.opsDeptID IS NOT NULL THEN (SELECT op.department FROM concerns c, ops op WHERE c.opsDeptID = op.deptID AND c.controlNumber = "` + req.query.controlNumber + `") END as department, p.property, ifae.ifaeCategory, CASE WHEN c.iFAECategoryID = 0 THEN (SELECT ad.category FROM concerns c, admin ad WHERE c.adminID = ad.id AND c.controlNumber = "` + req.query.controlNumber + `") WHEN c.iFAECategoryID = 1 THEN (SELECT ki.category FROM concerns c, kiosks ki WHERE c.kiosksID = ki.id AND c.controlNumber = "` + req.query.controlNumber + `") WHEN c.iFAECategoryID = 2 THEN (SELECT cr.category FROM concerns c, crm cr WHERE c.crmID = cr.id AND c.controlNumber = "` + req.query.controlNumber + `") WHEN c.iFAECategoryID = 3 THEN (SELECT pb.category FROM concerns c, paybills pb WHERE c.pbID = pb.id AND c.controlNumber = "` + req.query.controlNumber + `") WHEN c.iFAECategoryID = 4 THEN (SELECT cc.category FROM concerns c, ccms cc WHERE c.ccmsID = cc.id AND c.controlNumber = "` + req.query.controlNumber + `") WHEN c.iFAECategoryID = 5 THEN (SELECT dd.category FROM concerns c, ddms dd WHERE c.ddmsID = dd.id AND c.controlNumber = "` + req.query.controlNumber + `") END as subcategory, CASE WHEN c.iFAECategoryID = 0 THEN (SELECT adminOthers FROM concerns WHERE controlNumber = "` + req.query.controlNumber + `") WHEN c.iFAECategoryID = 1 THEN (SELECT kiosksOthers FROM concerns WHERE controlNumber = "` + req.query.controlNumber + `") WHEN c.iFAECategoryID = 2 THEN (SELECT crmOthers FROM concerns WHERE controlNumber = "` + req.query.controlNumber + `") WHEN c.iFAECategoryID = 3 THEN (SELECT pbOthers FROM concerns WHERE controlNumber = "` + req.query.controlNumber + `") WHEN c.iFAECategoryID = 4 THEN (SELECT ccmsOthers FROM concerns WHERE controlNumber = "` + req.query.controlNumber + `") WHEN c.iFAECategoryID = 5 THEN (SELECT ddmsOthers FROM concerns WHERE controlNumber = "` + req.query.controlNumber + `") END as other, c.concern, c.errorID, c.resolution, c.qaqcID, c.priorityID, c.statusID, c.resolution, c.dateCompleted, c.isLocked FROM concerns c, division dv, property p, status s, ifaecategory ifae WHERE c.propertyID = p.propertyID AND c.statusID = s.statusID AND c.divisionID = dv.divisionID AND c.iFAECategoryID = ifae.ifaeID AND c.controlNumber = "` + req.query.controlNumber + `";`
            db.query(sql, function(err, results){
                var info = results;
                console.log(info);
                var status_code = results[0].status_id;
                var error_code = results[0].error_id;
                var resolution = results[0].resolution;
                var qaqc_code = results[0].qaqc_id;
                var priority_code = results[0].priority_id;
                var dateCompleted = results[0].date_completed == null ? "N/A" : results[0].date_completed;
                var isLocked = Boolean((results[0].isLocked).readInt8());
                console.log(dateCompleted);
                sql = `SELECT * FROM error`
                db.query(sql, function(err, results){
                    var errorList = results;
                    var errorCurrent;
                    if (error_code == null){
                        errorCurrent = "Select error type";
                    }
                    else{
                        errorCurrent = results[error_code].error;
                    }
                    sql = `SELECT * FROM priority`
                    db.query(sql, function(err, results){
                        var priorityList = results;
                        var priorityCurrent;
                        if (priority_code == null){
                            priorityCurrent = "Select Priority Level";
                        }
                        else{
                            priorityCurrent = results[priority_code].priority;
                        }
                        sql = `SELECT * FROM status`
                        db.query(sql, function(err, results){
                            var statusList = results;
                            var statusCurrent;
                            var status_color;
                            var status_text_color;
                            var authorized = (isLocked == 0) || (isLocked == 1 && qaqc_code == req.session.userid) ? "" : "disabled";
                            var hideTransfer = (isLocked == 1 && qaqc_code == req.session.userid) ? "" : "d-none";
                            if (status_code == null){
                                statusCurrent = "Select status";
                                status_color = light;
                                status_text_color = dark;
                            }
                            else{
                                statusCurrent = results[status_code].status;
                                status_color = results[status_code].color_class;
                                status_text_color = results[status_code].text_color;
                            }
                            sql = `SELECT id, name FROM qaqc WHERE id NOT LIKE ` + req.session.userid;
                            db.query(sql, function (err, results) {
                                var qaqc_list = results;
                                if (qaqc_code != null){
                                    sql = `SELECT name FROM qaqc WHERE id=` + qaqc_code;
                                    db.query(sql, function(err, results){
                                        var qaqc_name = results[0].name;
                                        res.render("ticket", {control_no: req.query.control_number, info:info, errorItem:errorList, priorityItem:priorityList, statusItem:statusList, qaqc:qaqc_name, resolution:resolution, dateCompleted:dateCompleted, statusCodeCurrent:status_code, statusCurrent:statusCurrent, errorCodeCurrent:error_code, errorCurrent:errorCurrent, priorityCodeCurrent:priority_code, priorityCurrent:priorityCurrent, authorized:authorized, qaqc_user:qaqc_list, status_color:status_color, text_color:status_text_color, hide_transfer:hideTransfer, qaqc_code:qaqc_code});
                                    })
                                }
                                else{
                                    var qaqc_name = "<none>"
                                    res.render("ticket", {control_no: req.query.control_number, info:info, errorItem:errorList, priorityItem:priorityList, statusItem:statusList, qaqc:qaqc_name, resolution:resolution, dateCompleted:dateCompleted, statusCodeCurrent:status_code, statusCurrent:statusCurrent, errorCodeCurrent:error_code, errorCurrent:errorCurrent, priorityCodeCurrent:priority_code, priorityCurrent:priorityCurrent, authorized:authorized, qaqc_user:qaqc_list, status_color:status_color, text_color:status_text_color, hide_transfer:hideTransfer, qaqc_code:qaqc_code});
                                }
                            });
                        });
                    });
                });
            });       
        }
    }, 

    updateTicket: function (req,res){
        console.log(req.body);
        var resolution =  req.body.resolution == "" ? "NULL" : ("\"" + req.body.resolution + "\""); 
        var error = req.body.error_code == "" ? "NULL" : req.body.error_code;
        var priority = req.body.priority_code == "" ? "NULL" : req.body.priority_code;
        var status = req.body.status_code == "" ? "NULL" : req.body.status_code;
        var controlNumber = req.body.control_number;
        var qaqc = req.body.qaqc_code != "" ? req.body.qaqc_code: req.session.userid;
        var today = new Date();
        var dateCompleted = status == 0 ? "\"" + today.toISOString().slice(0, 19).replace('T', ' ')  + "\"": "NULL";
        console.log("dateCompleted = " + dateCompleted);
        var sql = `UPDATE concerns SET resolution = ` + resolution + `, error_id = ` + error + `, priority_id = ` + priority + `, status_id = ` + status + `, qaqc_id = ` + qaqc + `, date_completed = ` + dateCompleted + `, isLocked = 1 WHERE control_number = "` + controlNumber + `"`;
        console.log(sql);
        db.query(sql, function(err, results){
            if (err){
                console.log(err);
            }
            res.send(200);
        });
    }
};

module.exports = controller;