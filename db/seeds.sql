USE company_db;

INSERT INTO department(name)
VALUES  ("Front End Development"),
        ("Back End Development"),
        ("Floater Developers");

INSERT INTO role(title,salary,department_id) 
VALUES  ("Front End Dev", 75000, 1),
        ("Back End Dev", 90000, 2),
        ("Full Stack Dev", 105000, 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES  ("Alex", "Palson", 3, null),
        ("Sigmund", "Freud", 1, 8),
        ("John", "Jones", 2, 7),
        ("Ayaka", "Kirihara", 1, 8),
        ("Harold", "Jenkins", 3, 1),
        ("Thomas", "Goat", 2, 7),
        ("Meryl", "Stark", 2, null),
        ("Butch", "Cassidy", 1, null),
        ("Sundance", "Kid", 3, 1);
