const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "employeeDB",
});

connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("connected as id " + connection.threadId);
  start();
});

function start() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "options",
        choices: [
          "View all Employees",
          "View Employees by Roles",
          "View Employees by Department",
          "Exit",
        ],
      },
    ])
    .then((answers) => {
      // If place item
      if (answers.options === "View all Employees") {
        view_employees();
      }
      if (answers.options === "View Employees by Roles") {
        view_by_roles();
      }
      if (answers.options === "View Employees by Department") {
        view_by_department();
      }
      if (answers.options === "Exit") {
        connection.end();
      }
    })
    .catch((error) => {
      console.log(error);
      process.exit(1);
    });
}

//view ALL employees
function view_employees() {
  const sqlString =
    "SELECT employee.id, employee.first_name, employee.last_name, role.title AS position, role.salary AS salary, department.name AS department, CONCAT(manager.first_name,' ', manager.last_name) AS manager FROM employee LEFT JOIN employee AS manager ON employee.manager_id = manager.id LEFT JOIN role ON role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id;";
  // the callback will receive an error object or response object from connection.query
  const callback = (err, res) => {
    if (err) {
      throw err;
    }
    console.table(res)
    console.log("-----------------------------------");
    return start();
  };
  // pass an sql query string and callback function
  return connection.query(sqlString, callback);
}

//view ALL roles
function view_by_roles() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What role would you like to search?",
        name: "options",
        choices: ["CEO", "Engineer", "Tech Support", "Secretary"],
      },
    ])
    .then((answers) => {
      // If place item
      if (answers.options === "CEO") {
        view_CEO();
      }
      if (answers.options === "Engineer") {
        view_engineer();
      }
      if (answers.options === "Tech Support") {
        view_tech();
      }
      if (answers.options === "Secretary") {
        view_secretary();
      }
      if (answers.options === "Back to Main Menu") {
        start();
      }
    });
}

function view_CEO() {
  const sqlString = "";
  // the callback will receive an error object or response object from connection.query
  const callback = (err, res) => {
    if (err) {
      throw err;
    }
    res.forEach((row) =>
      console.log(`${row.id} | ${row.title} | ${row.salary}`)
    );
    console.log("-----------------------------------");
    return start();
  };
  // pass an sql query string and callback function
  return connection.query(sqlString, callback);
}

//view ALL departments
function view_by_department() {
  const sqlString = "SELECT * FROM department";
  // the callback will receive an error object or response object from connection.query
  const callback = (err, res) => {
    if (err) {
      throw err;
    }
    res.forEach((row) => console.log(`${row.id} | ${row.name}`));
    console.log("-----------------------------------");
    return start();
  };
  // pass an sql query string and callback function
  return connection.query(sqlString, callback);
}
