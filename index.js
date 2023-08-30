const db = require('./models/model.js');
const path = require('path');
const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session'); 
var app = express();
const hbs = require('hbs');
const bodyparser = require ('body-parser');
const port = 3000;
//let fileStore = require("session-file-store")(sessions);

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(`public`));

const oneDay = 1000 * 60 * 60 * 24;

app.use(cookieParser("hjdhslhldhfiuhw24541254mnsdmndsvn"));

app.use(sessions({
    secret: "hjdhslhldhfiuhw24541254mnsdmndsvn",
    saveUninitialized: false,
    cookie: {maxAge: oneDay},
    resave: false,
    rolling:true,
    //store: new fileStore()
}));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

const routes = require('./routes/routes.js');

app.use("/", routes);


app.set(`view engine`, `hbs`);
hbs.registerPartials(__dirname + `/views/partials`);

app.listen(port, () =>{
    console.log(port)
});
