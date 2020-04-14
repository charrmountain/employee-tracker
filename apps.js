// function to handle view all employees by MANAGER
function view_by_manager() {
    return inquirer
      .prompt([
        {
          name: "manager",
          type: "input",
          message: "Under which manager?",
        },
      ])
      .then((answer) => {
        const sqlString =
          "SELECT * , employee.last_name, employee.role_id, manager.first_name AS manager_first FROM employee JOIN employee AS manager ON employee.manager_id = manager.id WHERE manager.first_name = ?";
        const manager_answer = [answer.manager];
        const callback = (err, res) => {
          if (err) {
            throw err;
          }
          res.forEach((row) =>
            console.log(`${row.first_name} | ${row.last_name}`)
          );
          console.log("-----------------------------------");
          return start();
        };
        // pass an sql query string and callback function
        return connection.query(sqlString, manager_answer, callback);
      });
  }
  