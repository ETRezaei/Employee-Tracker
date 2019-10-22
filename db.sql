-- drop database if exists employeeDB;
-- create database employeeDB;
-- USE employeeDB;

-- CREATE TABLE department (

--   id INT auto_increment NOT NULL,
--   name VARCHAR(30),
--   PRIMARY KEY (id)
-- );
-- CREATE TABLE role (

--   id INT auto_increment NOT NULL,
--   title VARCHAR(30),
--   salary DECIMAL (10,2),
--   department_id INT,
--   PRIMARY KEY (id)
-- );
-- CREATE TABLE employee (

--   id INT auto_increment NOT NULL,
--   first_name VARCHAR(30),
--   last_name VARCHAR(30),
--   role_id INT,
--   manager_id INT NULL,
--   PRIMARY KEY (id)
-- );

-- insert into department(name)
-- values('Sales');
-- insert into department(name)
-- values('Engineering');
-- insert into department(name)
-- values('Finance');
-- insert into department(name)
-- values('Legal');
-- insert into department(name)
-- values('Human Resource');

--  insert into role(title, salary, department_id)
--  values('Sales Lead', 100000, 1);
--  insert into role(title, salary, department_id)
--  values('Salesperson', 80000, 1);
--  insert into role(title, salary, department_id)
--  values('Lead Engineer', 150000, 2);
--  insert into role(title, salary, department_id)
--  values('Software Engineer', 120000, 2);
--  insert into role(title, salary, department_id)
--  values('Account Manager', 160000, 3);
--  insert into role(title, salary, department_id)
--  values('Accountant', 125000, 3);
--  insert into role(title, salary, department_id)
--  values('Legal Team Lead', 250000, 4);
--  insert into role(title, salary, department_id)
--  values('Lawyer', 190000, 4);
--  insert into role(title, salary, department_id)
--  values('HR', 50000, 5);

--  insert into employee(first_name, last_name, role_id)
--  values('John', 'Doe', 9);
--  insert into employee(first_name, last_name, role_id)
--  values('Mike', 'Chan', 2);
--  insert into employee(first_name, last_name, role_id)
--  values('Ashley', 'Rodriguez', 5);
--  insert into employee(first_name, last_name, role_id)
--  values('Kevin', 'Tupik', 3);
--  insert into employee(first_name, last_name, role_id)
--  values('Kunal', 'Singh', 8);
--  insert into employee(first_name, last_name, role_id)
--  values('Malis', 'Brown', 1);
--  insert into employee(first_name, last_name, role_id)
--  values('Sarah', 'Lourd', 4);
--  insert into employee(first_name, last_name, role_id)
--  values('Tom', 'Allen', 7);
--  insert into employee(first_name, last_name, role_id)
--  values('Hugo', 'Smith', 6);

 -- update  employee e 
--  set e.manager_id = 6
--  where e.id = 2

-- update  employee e 
-- set e.manager_id = 4
-- where e.id = 7

-- update  employee e 
-- set e.manager_id = 3
-- where e.id = 9

-- update  employee e 
-- set e.manager_id = 8
-- where e.id = 5


