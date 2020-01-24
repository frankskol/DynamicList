const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");


// get all user
Router.get("/", (req, res) =>{
    mysqlConnection.query("SELECT * from react.User", (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        }
        else {
            console.log(err);
        }
    })
})

//get one user
Router.get("/:username", (req, res) =>{
    mysqlConnection.query("SELECT * from react.User WHERE username = ?", [req.params.username], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        }
        else {
            console.log(err);
        }
    })
})

//delete one user
Router.delete("/", (req, res) =>{

    mysqlConnection.query("DELETE FROM react.User WHERE username = ?", [req.params.username], (err, rows, fields) => {
        if (!err) {
            res.send('Deletion successful');
        }
        else {
            console.log(err);
        }
    })
})

//insert one user
Router.post("/add/", (req, res) =>{
    mysqlConnection.query("INSERT INTO react.User (username, longitude, latitude, status) VALUES (?, ?, ?, ?)", [req.body.username, req.body.longitude, req.body.latitude, req.body.status], (err, rows, fields) => {
        if (!err) {
            res.send('Insert successful');
        }
        else {
			res.send('Insert failed');
            console.log(err);
        }
    })
})

//update one user
Router.post("/update/", (req, res) =>{
    mysqlConnection.query("UPDATE react.User SET longitude = ?, latitude = ?, status = ? WHERE username = ?", [ req.body.longitude, req.body.latitude, req.body.status, req.body.username], (err, rows, fields) => {
        if (!err) {
            res.send('Update successful');
        }
        else {
			res.send('Update failed');
            console.log(err);
        }
    })
})


module.exports = Router;