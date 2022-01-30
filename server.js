
const mysql = require("mysql");
const inquirer = require("inquirer");
const consTable = require("console.table");


const express = require("express");
const PORT = process.env.PORT || 9001;
const app = express();
// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    port: 9001,

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
    console.log("Connected to the Employee Database!");
    // begin questions
    startPrompt();
});


function startPrompt() {
    inquirer.prompt({
        type: "list",
        name: "task",
        message: "What can I help you with?",
        choices: [
            "View Departments",
            "View Roles",
            "View Employees",

            "Add New Department",
            "Add New Role",
            "Add New Employee",

            "Update An Employee's Role",

            "Delete A Department",
            "Delete A Role",
            "Delete An Employee",

            "End"
        ],
    })
        .then((selection) => {
            switch (selection) {
                case "View Departments":
                    viewDep();
                case "View Roles":
                    viewRol();
                case "View Employees":
                    viewEmp();
                break;

                case "Add New Department":
                    addDep();
                case "Add New Role":
                    addRol()
                case "Add New Employee":
                    addEmp()
                break;

                case "Update An Employee's Role":
                    updateEmp();
                    break;

                case "Delete A Department":
                    delDep();
                case "Delete A Role":
                    delRol();
                case "Delete An Employee":
                    delEmp();
                    break;

                case "End":
                    fin();
            }
        });
};

// FUNCTIONS

function viewDep() {
    console.log("Departments");
    
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})