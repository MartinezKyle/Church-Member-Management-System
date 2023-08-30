const mysql = require('mysql');
const fs = require('fs');
const path = require('path');

var config = {
    host: 'localhost',
    user: 'root',
    database: 'tickets',
    password: 'password'
};
console.log(config);
let pool = mysql.createConnection(config);
module.exports = pool;