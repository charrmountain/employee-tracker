const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

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

const sqlString =
  "SELECT employee.id, employee.first_name, employee.last_name, role.title AS position, role.salary AS salary, department.name AS department, CONCAT(manager.first_name,' ', manager.last_name) AS manager FROM employee LEFT JOIN employee AS manager ON employee.manager_id = manager.id LEFT JOIN role ON role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id";

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
          "Add an Employee",
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
      if (answers.options === "Add an Employee") {
        add_employee();
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
// -----------------------------VIEWS-----------------------------
// -----------------------------VIEW ALL-----------------------------
//view ALL employees
function view_employees() {
  // the callback will receive an error object or response object from connection.query
  const callback = (err, res) => {
    if (err) {
      throw err;
    }
    console.table(res);
    console.log("-----------------------------------");
    return start();
  };
  // pass an sql query string and callback function
  return connection.query(sqlString, callback);
}

// -----------------------------VIEW BY ROLES-----------------------------
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
  const CEO = " WHERE role.title = 'CEO'";
  // the callback will receive an error object or response object from connection.query
  const callback = (err, res) => {
    if (err) {
      throw err;
    }
    console.table(res);
    console.log("-----------------------------------");
    return start();
  };
  // pass an sql query string and callback function
  return connection.query(sqlString + CEO, callback);
}

function view_engineer() {
  const Engineer = " WHERE role.title = 'Engineer'";
  // the callback will receive an error object or response object from connection.query
  const callback = (err, res) => {
    if (err) {
      throw err;
    }
    console.table(res);
    console.log("-----------------------------------");
    return start();
  };
  // pass an sql query string and callback function
  return connection.query(sqlString + Engineer, callback);
}

function view_tech() {
  const Tech = " WHERE role.title = 'Tech Support'";
  // the callback will receive an error object or response object from connection.query
  const callback = (err, res) => {
    if (err) {
      throw err;
    }
    console.table(res);
    console.log("-----------------------------------");
    return start();
  };
  // pass an sql query string and callback function
  return connection.query(sqlString + Tech, callback);
}

function view_secretary() {
  const Secretary = " WHERE role.title = 'Secretary'";
  // the callback will receive an error object or response object from connection.query
  const callback = (err, res) => {
    if (err) {
      throw err;
    }
    console.table(res);
    console.log("-----------------------------------");
    return start();
  };
  // pass an sql query string and callback function
  return connection.query(sqlString + Secretary, callback);
}

// -----------------------------VIEW BY DEPARTMENT-----------------------------
//view ALL department
function view_by_department() {
    inquirer
      .prompt([
        {
          type: "list",
          message: "What role would you like to search?",
          name: "options",
          choices: ["Executive", "Technology", "Communications"],
        },
      ])
      .then((answers) => {
        // If place item
        if (answers.options === "Executive") {
          view_executive();
        }
        if (answers.options === "Technology") {
          view_technology();
        }
        if (answers.options === "Communications") {
          view_communications();
        }
        if (answers.options === "Back to Main Menu") {
          start();
        }
      });
  }

  function view_executive() {
    const executive = " WHERE department.name = 'Executive'";
    // the callback will receive an error object or response object from connection.query
    const callback = (err, res) => {
      if (err) {
        throw err;
      }
      console.table(res);
      console.log("-----------------------------------");
      return start();
    };
    // pass an sql query string and callback function
    return connection.query(sqlString + executive, callback);
  }
  
  function view_technology() {
    const tech_dept = " WHERE department.name = 'Technology'";
    // the callback will receive an error object or response object from connection.query
    const callback = (err, res) => {
      if (err) {
        throw err;
      }
      console.table(res);
      console.log("-----------------------------------");
      return start();
    };
    // pass an sql query string and callback function
    return connection.query(sqlString + tech_dept, callback);
  }
  
  function view_communications() {
    const communications = " WHERE department.name = 'Communications'";
    // the callback will receive an error object or response object from connection.query
    const callback = (err, res) => {
      if (err) {
        throw err;
      }
      console.table(res);
      console.log("-----------------------------------");
      return start();
    };
    // pass an sql query string and callback function
    return connection.query(sqlString + communications, callback);
  }


// -----------------------------ADD-----------------------------
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
    const CEO = " WHERE role.title = 'CEO'";
    // the callback will receive an error object or response object from connection.query
    const callback = (err, res) => {
      if (err) {
        throw err;
      }
      console.table(res);
      console.log("-----------------------------------");
      return start();
    };
    // pass an sql query string and callback function
    return connection.query(sqlString + CEO, callback);
  }
  

//   --------------------------ADD-----------------------------------

function add_employee() {
    const query_role = `SELECT id, title FROM role`;
    const query_employees = `SELECT id, first_name, last_name FROM employee`;
    const insert_query = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
    
    const employee_values = [];
    
    connection.query(query_role, (err, res) => {
      if (err) {
        throw err;
      }
      const role_array = res.map((row) => `${row.id} ${row.title}`);
      
      connection.query(query_employees, (err, res) => {
        if (err) {
          throw err;
        }
        const manager_array = res.map(
          (row) => `${row.id} ${row.first_name} ${row.last_name}`
        );
        
        manager_array.push("null");
        return inquirer
          .prompt([
            {
              name: "first",
              type: "input",
              message: "What is the employee's first name?",
            },
            {
              name: "last",
              type: "input",
              message: "What is the employee's last name?",
            },
            {
              name: "role",
              type: "rawlist",
              choices: role_array,
              message: "Choose a role for the employee",
            },
            {
              name: "manager",
              type: "rawlist",
              choices: manager_array,
              message: "Choose a manager for the employee",
            },
          ])
          .then((answer) => {
            const role_ID = answer.role.split(" ");
            const manager_ID = answer.manager.split(" ");

            employee_values.push(answer.first, answer.last, role_ID[0], manager_ID[0]);
            
            connection.query(
              insert_query,
              [employee_values[0], employee_values[1], employee_values[2], employee_values[3]],
              (err, res) => {
                if (err) {
                  throw err;
                }
              }
            );

            console.log("Employee added");
            start();
          });
      });
    });
  }
  