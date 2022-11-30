//Declaring dependencies
const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const session = require('express-session');
const favicon = require('express-favicon');
const exphbs = require('express-handlebars');
const routes = require('./routes/routes.js');
const db = require('./models/db.js');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo');
const app = express();
const port = process.env.SERVER_PORT; //Port number

// Configure DotEnv
dotenv.config();

//Sets app to use static files for displays
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//-------------Handlebars settings-----------------//
app.engine("hbs", exphbs.engine({extname: 'hbs'})); 
app.set("view engine", "hbs");
app.set("views", "./views");

//Database Connection
db.connect();

// Initialize Express Session
app.use(session({
	secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
	store: MongoStore.create({
        mongoUrl: process.env.ONLINE_URL
    })
}));

//Sets the app to use routes.js for page routing
app.use(`/`, routes);
/*
app.use((req, res) => {
    var details = {};

    if(req.session.pnum) {
        details.flag = true;
        details.pnum = req.session.pnum;
    } else
        details.flag = false;

	// TODO: Add error.hbs page for any errors
    res.render('error', details);
});
*/
//Sets the port to listen to
app.listen(port, () => {
    console.log("Currently listening at Port " + port);
});