USE employee_db;

INSERT INTO department(name)
VALUES
("Sales"), 
("Engineering"), 
("Finance"), 
("Legal");

DELETE FROM department(name)
WHERE 
("Sales"), 
("Engineering"), 
("Finance"), 
("Legal");

INSERT INTO role(title, salary, department_id)
VALUES
("Sales Lead", 100000, 1),
("Salesperson", 80000, 1),
("Lead Engineer", 150000, 2),
("Software Engineer", 120000, 2),
("Accountant", 125000, 3),
("Legal Team Lead", 250000, 4),
("Lawyer", 190000, 4),
("Software Engineer", 120000, 2);

DELETE FROM role(title, salary, department_id)
WHERE
("Sales Lead", 100000, 1),
("Salesperson", 80000, 1),
("Lead Engineer", 150000, 2),
("Software Engineer", 120000, 2),
("Accountant", 125000, 3),
("Legal Team Lead", 250000, 4),
("Lawyer", 190000, 4),
("Software Engineer", 120000, 2);

INSERT INTO employee(first_name, last_name, role_id)
VALUES
("John", "Doe", 1),
("Mike", "Chan", 2),
("Ashley", "Rodriguez", 3),
("Kevin", "Tupik", 4),
("Malia", "Brown", 5),
("Sarah", "Lourd", 6),
("Tom", "Allen", 7),
("Tammer", "Galal", 8);

DELETE FROM employee(first_name, last_name, role_id)
WHERE
("John", "Doe", 1),
("Mike", "Chan", 2),
("Ashley", "Rodriguez", 3),
("Kevin", "Tupik", 4),
("Malia", "Brown", 5),
("Sarah", "Lourd", 6),
("Tom", "Allen", 7),
("Tammer", "Galal", 8);

UPDATE employee SET manager_id = 3 WHERE id = 1 or id = 4;
UPDATE employee SET manager_id = 1 WHERE id = 2;
UPDATE employee SET manager_id = 6 WHERE id = 7;
UPDATE employee SET manager_id = 4 WHERE id = 8;



