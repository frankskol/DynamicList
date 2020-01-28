const express = require("express");
const bodyParser = require("body-parser");
const mysqlConnection = require("./connection");

const PeopleRoutes = require("./routes/user");

let app = express();

//CORS control
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header("Access-Control-Allow-Methods",  "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(bodyParser.json());

app.use("/user", PeopleRoutes);


var http = require('http');


app.listen(3000);