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
