function add_employee() {
  const query_employees = `SELECT id, first_name, last_name FROM employee`;
  const insert_query = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
  const query_role = `SELECT id, title FROM role`;
  const values = [];
  connection.query(query_role, (err, res) => {
    if (err) {
      throw err;
    }
    const role_array = res.map((row) => `${row.id} ${row.title}`);
    connection.query(query_employees, (err, res) => {
      if (err) {
        throw err;
      }
      const emp_array = res.map(
        (row) => `${row.id} ${row.first_name} ${row.last_name}`
      );
      empArr.push("null");
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
            choices: emp_array,
            message: "Choose a manager for the employee",
          },
        ])
        .then((answer) => {
          const roleID = answer.role.split(" ");
          const managerID = answer.manager.split(" ");
          values.push(answer.first, answer.last, roleID[0], managerID[0]);
          console.log(values);
          connection.query(
            insert_query,
            [values[0], values[1], values[2], values[3]],
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
