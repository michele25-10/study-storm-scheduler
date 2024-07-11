const mysql = require('mysql');

//Connessione al db
const sql = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    database: process.env.DB
});

module.exports = sql;