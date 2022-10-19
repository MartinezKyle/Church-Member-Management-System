const express = require('express');
const controller = require('../controllers/controller.js');
const memberlist_controller = require('../controllers/memberlist_controller.js');
const attendance_controller = require('../controllers/attendance_controller.js');
const register_controller = require('../controllers/register_controller.js');
const sessions_controller = require('../controllers/sessions_controller.js');
const app = express.Router();

//-------- Webpages ----------//
app.get('/', controller.getIndex);
app.get('/getIndex', controller.getIndex);
app.get('/login', controller.loadLogin);
app.get('/register', controller.loadRegister);
app.get('/loadMembers', controller.loadMembers);
app.get('/admin_homepage', controller.loadAdminHP);
app.get('/attendance', controller.loadAttendance);
app.get('/sessions', controller.loadSessions);
app.get('/deleteMember', memberlist_controller.deleteMember);
app.get('/addSession', sessions_controller.findSession);
app.get('/deleteSession', sessions_controller.deleteSession);
//-------- Members Info ---------//
app.get('/addMembers', register_controller.addMembers);
app.get('/addAttendance', attendance_controller.addAttendance);

//-------- Register Actions ---------//
app.get('/addUser', register_controller.getAdd);

//-------- Login Checking ----------//
app.post('/CheckLogin', controller.CheckLogin);

module.exports = app;
