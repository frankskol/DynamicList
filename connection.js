let mysql = require("mysql");

//Connection to Database
let mysqlConnection = mysql.createConnection({
    host: "host",
    user:"user",
    password:"password",
    database: "database",
    port: "port"
});


mysqlConnection.connect(function(err) {
    if (err) {
        return console.error('error: ' + err.message);
    }

    console.log('Connected to the MySQL server.');
});

module.exports = mysqlConnection;