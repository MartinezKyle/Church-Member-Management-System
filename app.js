//Declaring dependencies
const path = require('path');
const express = require('express');
const favicon = require('express-favicon');
const exphbs = require('express-handlebars');
const routes = require('./routes/routes.js');
const db = require('./models/db.js');
const app = express();
const port = 3000; //Port number

//Sets app to use static files for displays
app.use(express.static(__dirname + "/public"));

//Sets the app to use routes.js for page routing
app.use(`/`, routes);

//-------------Handlebars settings-----------------//
app.engine("hbs", exphbs.engine({extname: 'hbs'})); 
app.set("view engine", "hbs");
app.set("views", "./views");

//Database Connection
db.connect();

//Sets the port to listen to
app.listen(port, () => {
    console.log("Currently listening at Port " + port);
});