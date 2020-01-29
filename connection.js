let mysql = require("mysql");

//Data for connecting to Database
let mysqlConnection = mysql.createConnection({
    host: "host",
    user:"user",
    password:"password",
    database: "database",
    port: "port"
});

//Method for connecting to Database
mysqlConnection.connect(function(err) {
    if (err) {
        return console.error('error: ' + err.message);
    }

    console.log('Connected to the MySQL server.');
});

module.exports = mysqlConnection;