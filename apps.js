function add_role() {
  const insert_query_role = `INSERT INTO role(title, salary, departmentID) VALUES (?, ?, ?)`;
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
          console.log("Department added");
          start();
        });
  });
}
