const express = require('express');
const controller = require('../controllers/controller.js');
const memberlist_controller = require('../controllers/memberlist-controller.js');
const app = express.Router();

//-------- Webpages ----------//
app.get('/', controller.getIndex);
app.get('/getIndex', controller.getIndex);
app.get('/login', controller.loadLogin);
app.get('/register', controller.loadRegister);
app.get('/loadMembers', controller.loadMembers);
app.get('/admin_homepage', controller.loadAdminHP);
app.get('/deleteMember', memberlist_controller.deleteMember);

//-------- Members Info ---------//
app.get('/addMembers', controller.addMembers);


//-------- Register Actions ---------//
app.get('/addUser', controller.getAdd);

//-------- Login Checking ----------//
app.post('/CheckLogin', controller.CheckLogin);

module.exports = app;
