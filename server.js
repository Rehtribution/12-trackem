
const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

const express = require("express");
const app = express();
// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "/8520",
        database: "emp",
    },
);

// connect to mysql
db.connect(function (err) {
    if (err) throw err;
    console.log("Connected to the Employee Database!");
    // begin questions
    startPrompt();
});


function startPrompt() {
    inquirer.prompt({
        type: "list",
        name: "tasks",
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
        .then(function (selection) {
            console.log("You chose to" + selection.tasks);
            switch (selection.tasks) {
                case "View Departments":
                    viewDep();
                    break;
                case "View Roles":
                    viewRol();
                    break;
                case "View Employees":
                    viewEmp();
                    break;

                case "Add New Department":
                    addDep();
                    break;
                case "Add New Role":
                    addRol()
                    break;
                case "Add New Employee":
                    addEmp()
                    break;

                case "Update An Employee's Role":
                    updateEmp();
                    break;

                case "Delete A Department":
                    delDep();
                    break;
                case "Delete A Role":
                    delRol();
                    break;
                case "Delete An Employee":
                    delEmp();
                    break;

                case "End":
                    fin();
            }
        });
}

// FUNCTIONS start
// VIEW functions
function viewDep() {
    console.log("=========Department list=========");
    db.query("SELECT * FROM department", (err, rows) => {
        if (err) throw err;
        console.table(rows);
        startPrompt();
    });
};

function viewRol() {
    console.log("=========Roles list=========");
    db.query("SELECT * FROM role", (err, res) => {
        if (err) throw err;
        console.table(res);
        startPrompt();
    });
};

function viewEmp() {
    console.log("=========Employee list=========");
    db.query("SELECT * FROM employee", (err, rows) => {
        if (err) throw err;
        console.table(rows);
        startPrompt();
    });
};

// ADD functions
function addDep() {
    inquirer.prompt({
        type: "input",
        name: "depName",
        message: "What is the department you would like to add?",
    })
        .then(entry => {
            db.query(`INSERT INTO department (name) VALUES ( ? )`,
                entry.depName, (err, res) => {
                    if (err) throw err;
                    console.log("dept added");
                });
            viewDep();
        });
}

function addRol() {
    inquirer.prompt([
        {
            type: "input",
            name: "rolName",
            message: "What is the Role you would like to add?",
        },
        {
            type: "input",
            name: "rolSalary",
            message: "What is the Salary for this Role?",
        },
        {
            type: "input",
            name: "deptId",
            message: "What is the Department ID Number for this Role?",
        }
    ])
        .then(entry => {
            db.query(`INSERT INTO role (title, salary, dept_id) VALUES ( ?, ?, ? )`,
                [entry.rolName, entry.rolSalary, entry.deptId],
                (err, res) => {
                    if (err) throw err;
                    console.log("Role Added!");
                });
            viewRol();
        });
}

function addEmp() {
    inquirer.prompt([
        {
            type: "input",
            name: "empFirst",
            message: "What is the employee's first name?",
        },
        {
            type: "input",
            name: "empLast",
            message: "What is the employee's last name?",
        },
        {
            type: "input",
            name: "roleId",
            message: "What is their Role ID Number?",
        },
        {
            type: "input",
            name: "manId",
            message: "What is their Manager's ID Number?",
        }
    ])
        .then(entry => {
            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ( ?, ?, ?, ? )`,
                [entry.empFirst, entry.empLast, entry.roleId, entry.manId],
                (err, res) => {
                    if (err) throw err;
                    console.log("Employee Added!");
                });
            viewEmp();
        });
}

// UPDATE NOT FUNCTIONAL
function updateEmp() {
    db.query(`UPDATE employee 
    SET role_id = ? 
    WHERE role_id = ?`, (err, res) => {
        if (err) throw err;
        console.log("updated");
    });

    // inquirer.prompt({
    //     type: "list",
    //     name: "change",
    //     message: "What would you like to update?",
    //     choices: [
    //         "Update First Name",
    //         "Update Last Name",
    //         "Update Role",
    //         "Update Manager",
    //         "End"
    //     ],
    // })
    //     .then(function (selection) {
    //         console.log("You chose to" + selection.change);
    //         switch (selection.change) {
    //             case "tbd":
    //                 tbd();
    //                 break;
    //         }
            viewEmp();
        // });
}

// DELETE
