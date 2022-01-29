const mysql = require("mysql");
const inquirer = require("inquirer");
const consTable = require("console.table");


const express = require('express');
const PORT = process.env.PORT || 9001;
const app = express();

// Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    port: 9001,
    
    // placeholder username and password
    user: 'root',
    password: '',
    database: "employeedb"
})

// connect to mysql
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Connected!");
});

// create new db
app.get('/newdb', (req, res) => {
    let sql = 'CREATE DATABASE employeedb';
        res.send('database created');
    });


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})