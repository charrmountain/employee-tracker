INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Shelley", "Sims", 1, null),
("Charlotte", "Mountain", 2, 1),
("John", "Stanczak", 2, 1),
("Deanna", "Melin", 2, 1),
("NapoLeanne", "Stanczak", 3, 2),
("Pearl", "Sims", 3, 1),
("Mica", "Sims", 4, 1);


INSERT INTO role (title, salary, department_id)
VALUES 
("CEO", 100000, 1),
("Engineer", 90000, 2),
("Tech Support", 80000, 2),
("Assistant", 50000, 3);


INSERT INTO department (name, id)
VALUES 
("Executive", 1),
("Technology", 2),
("Communications", 3);