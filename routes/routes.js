const express = require('express');
const controller = require('../controllers/controller.js');
const formController = require('../controllers/formController.js');
const loginController = require('../controllers/loginController.js');
const app = express.Router();

app.get('/', controller.getIndex);
//app.get('/login', controller.getLogin);

app.get('/form', formController.getForm);
app.post('/submit_form', formController.submitForm);
app.get('/getDepartments', formController.getDepartments);
app.get('/getSubcategory', formController.getSubCategory);
app.get('/login', controller.getLogin);
app.post('/checkLogin', loginController.checkLogin);
app.post('/createSession', controller.createSession);
app.get('/getDetails', loginController.getDetails);
app.get('/home', controller.getHome);
app.get('/ticket', controller.getTicket);
app.post('/updateTicket', controller.updateTicket);
app.get('/endSession', controller.destroySession);
app.get('/report', controller.getReport);
app.get('/statusReport', controller.getStatusReport);
app.get('/categoryReport', controller.getCategoryReport);
app.get('/errorReport', controller.getErrorReport);
app.get('/top5Report', controller.getTop5Report);
app.get('/table_filter',controller.getHomeFilter);
module.exports = app;