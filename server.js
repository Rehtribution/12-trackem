
const mysql = require("mysql");
const inquirer = require("inquirer");
const consTable = require("console.table");


const express = require("express");
const PORT = process.env.PORT || 3306;
const app = express();


const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    
    // placeholder username and password
    user: 'root',
    password: '',
    database: "emp"
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
    let sql = `CREATE DATABASE emp`;
        res.send('database created');
    });

app.get('/employeetable', (req, res) => {
    let sql = `CREATE TABLE employee(id int AUTO_INCREMENT PRIMARY KEY, name VARCHAR(40), position VARCHAR(40),`;
    res.send('employee table created');
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})