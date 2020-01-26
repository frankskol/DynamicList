let mysql = require("mysql");
let mysqlConnection = mysql.createConnection({
    host: "host",
    user:"user",
    password:"password",
    database: "test",
    port: "0"
});


mysqlConnection.connect(function(err) {
    if (err) {
        return console.error('error: ' + err.message);
    }

    console.log('Connected to the MySQL server.');
});

module.exports = mysqlConnection;