INSERT INTO department 
    (name)
VALUES 
    ('Human Resources'),
    ('Operations'),
    ('Sales');

INSERT INTO role (title, salary, dept_id)
VALUES
    ('HR Rep', 45000, 1),
    ('Sales Lead', 20000, 3),
    ('Operations Manager', 60000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Michael', 'Scott', 2, 1),
    ('Jim', 'Halpert', 3, 2),
    ('Toby', 'Flenderson', 1, 1);