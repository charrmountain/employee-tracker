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
          "View Employees by Manager",
          "Add an Employee",
          "Add a Position",
          "Add a Department",
          "Update Employee Position",
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
      if (answers.options === "View Employees by Manager") {
        view_by_manager();
      }
      if (answers.options === "Add an Employee") {
        add_employee();
      }
      if (answers.options === "Add a Position") {
        add_role();
      }
      if (answers.options === "Add a Department") {
        add_department();
      }
      if (answers.options === "Update Employee Position") {
        update_employee_role();
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
// ----------------------------------------------------------------------------
// ----------------------------------VIEW ALL----------------------------------
// ----------------------------------------------------------------------------
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

// ----------------------------------------------------------------------------
// --------------------------------VIEW BY ROLES-------------------------------
// ----------------------------------------------------------------------------
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

// ----------------------------------------------------------------------------
// -----------------------------VIEW BY DEPARTMENT-----------------------------
// ----------------------------------------------------------------------------
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

// ----------------------------------------------------------------------------
// ------------------------------ VIEW BY ROLE---------------------------------
// ----------------------------------------------------------------------------
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

// ----------------------------------------------------------------------------
// ------------------------------ADD EMPLOYEE----------------------------------
// ----------------------------------------------------------------------------
function add_employee() {
  const query_role = `SELECT id, title FROM role`;
  const query_employees = `SELECT id, first_name, last_name FROM employee`;
  const insert_query_employee = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;

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

          employee_values.push(
            answer.first,
            answer.last,
            role_ID[0],
            manager_ID[0]
          );

          connection.query(
            insert_query_employee,
            [
              employee_values[0],
              employee_values[1],
              employee_values[2],
              employee_values[3],
            ],
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



// ----------------------------------------------------------------------------
// ---------------------------------ADD ROLE----------------------------------
// ----------------------------------------------------------------------------
function add_role() {
    const insert_query_role = `INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?)`;
    const query_department = `SELECT id, name FROM department`;
    
    const role_values = [];
    
    connection.query(query_department, (err, res) => {
      if (err) {
        throw err;
      }
      const department_array = res.map((row) => `${row.id} ${row.name}`);
        return inquirer
          .prompt([
            {
              name: "position",
              type: "input",
              message: "What is the position?",
            },
            {
              name: "salary",
              type: "input",
              message: "What is the salary?",
            },
            {
              name: "department",
              type: "rawlist",
              choices: department_array,
              message: "Choose a department for the position",
            },
          ])
          .then((answer) => {
            const department_ID = answer.department.split(" ");
            role_values.push(answer.position, answer.salary, department_ID[0]);
            console.log(role_values);
            connection.query(
              insert_query_role,
              [role_values[0], role_values[1], role_values[2]],
              (err, res) => {
                if (err) {
                  throw err;
                }
              }
            );
            console.log("Position added");
            start();
          });
    });
  }

  // ----------------------------------------------------------------------------
// ------------------------------ADD DEPARTMENT---------------------------------
// ----------------------------------------------------------------------------

  function add_department() {
    const insert_query_department = `INSERT INTO department(name) VALUES (?)`;
  
    const department_values = [];
    return inquirer
      .prompt([
        {
          name: "department",
          type: "input",
          message: "What is the department?",
        },
      ])
      .then((answer) => {
        department_values.push(answer.department);
        connection.query(
          insert_query_department,
          [department_values[0], department_values[1], department_values[2]],
          (err, res) => {
            if (err) {
              throw err;
            }
          }
        );
        console.log("Department added");
        start();
      });
  }
  

 // ----------------------------------------------------------------------------
// ------------------------------UPDATE EMPLOYEE----------------------------------
// ----------------------------------------------------------------------------
  function update_employee_role() {
    const query_role_update = `SELECT id, title FROM role`;
    const query_employees_update = `SELECT id, first_name, last_name FROM employee`;
    const insert_query_employee = `UPDATE employee SET role_id = (?) WHERE id = (?) `;
  
    const employee__values_update = [];
  
    connection.query(query_role_update, (err, res) => {
      if (err) {
        throw err;
      }
      const role_array_update = res.map((row) => `${row.id} ${row.title}`);
  
      connection.query(query_employees_update, (err, res) => {
        if (err) {
          throw err;
        }
        const employee_array = res.map(
          (row) => `${row.id} ${row.first_name} ${row.last_name}`
        );
  
        employee_array.push("null");
        return inquirer
          .prompt([
            {
              name: "employee",
              type: "rawlist",
              choices: employee_array,
              message: "Which Employee would you like to update?",
            },
            {
              name: "role",
              type: "rawlist",
              choices: role_array_update,
              message: "Choose a role for the employee",
            },
          ])
          .then((answer) => {
            const role_ID_update = answer.role.split(" ");
            const employee_ID_update = answer.employee.split(" ");
  
            employee__values_update.push(
              role_ID_update[0],
              employee_ID_update[0]
            );
  
            connection.query(
              insert_query_employee,
              [employee__values_update[0], employee__values_update[1]],
              (err, res) => {
                if (err) {
                  throw err;
                }
              }
            );
  
            console.log("Employee position updated");
            start();
          });
      });
    });
  }

// ----------------------------------------------------------------------------
// ------------------------------VIEW BY MANAGER-------------------------------
// ----------------------------------------------------------------------------
function view_by_manager() {
  const query_manager_view = `SELECT id, first_name, last_name FROM employee`;
  const join_query = ` SELECT 
  CONCAT(manager.first_name," ",manager.last_name) AS manager,
  employee.id, 
  employee.first_name, 
  employee.last_name
  FROM employee
  LEFT JOIN employee AS manager 
    ON employee.manager_id = manager.id
  WHERE manager.id = ?;`;

  const  manager_view = [];

    connection.query(query_manager_view, (err, res) => {
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
            name: "manager_view",
            type: "rawlist",
            choices: manager_array,
            message: "Which manager would you like to view?",
          },
        ])
        .then((answer) => {
          const manager_choice_ID = answer.manager_view.split(" ");

          manager_view.push(manager_choice_ID[0]);

          connection.query(
            join_query,
            [manager_view],
            (err, res) => {
              if (err) {
                throw err;
              }
              console.table(res)
            }
          );
          start();
        });
  });
}