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
