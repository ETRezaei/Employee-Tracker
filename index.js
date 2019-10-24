const inquirer = require("inquirer");
const mysql = require("mysql");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employeedb"
  });

  connection.connect(function(err) {
    if (err) {
      console.log("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
  });

getUserInfo();
  async function getUserInfo(){

    const {question} = await inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "question",
      choices: [
        "View All Employees", 
        "View All Employees By Department", 
        "View All Employees By Manager",
        "Add Emloyee",
        "Remove Employee",
        "Update Employee Role",
        // "Update Employee Manager",
        "View All Roles",
        "Add Role",
        // "Remove Role",
        "View All Departments",
        "Add Department",
        // "Remove Department",
        "Quit"

      ]}
    ]);
    

    switch(question){
        case "View All Employees":
            getAllEmplyees() 
            break;
        case "View All Employees By Department":
            getAllEmployeesByDepartment()
            break;
        case "View All Employees By Manager":
            getAllEmployeesByManager()
            break;
        case "Add Emloyee":
            addEmployee()
            break;
        case "Remove Employee":
            removeEmployee()
            break;
        case "Update Employee Role":
            updateEmployeeRole()
            break;
        case "View All Roles":
            viewAllRoles()
            break;
        case "Add Role":
            addRole()
            break;
        case "View All Departments":
            viewAllDepartments()
            break;
        case "Add Department":
            addDepartment()
            break;
        case "Quit":
            quit();
            break;   
    
    }

    function getAllEmplyees(){

        connection.query(`SELECT e.First_Name,
                                e.Last_Name,
                                r.title,
                                r.salary,
                                d.name as department,
                                concat(e2.First_Name,  ' ',  e2.Last_Name) AS Manager
                        FROM employee as e
                        JOIN role as r
                        ON e.role_id = r.id
                        JOIN department as d
                        ON d.id = r.department_id
                        LEFT JOIN employee as e2
                        ON e.manager_id = e2.id`, 
                        function(err, result) {
                                if (err) console.log(err);
                                console.log("\n\n\n\n")
                                console.table(result)
                                console.log("\n\n\n\n\n\n\n");;
                                //return result
        });
        getUserInfo();
    }
    async function getAllEmployeesByDepartment(){
        const {byDepartment} = await inquirer.prompt([
            {
              type: "list",
              message: "What department would you like to see employee for?",
              name: "byDepartment",
              choices: [
                "Sales", 
                "Engineering", 
                "Finance",
                "Legal",
                "HR"
        ]}
    ]);

    connection.query(`SELECT e.First_Name,
                                e.Last_Name,
                                r.title,
                                r.salary,
                                d.name as department,
                                concat(e2.First_Name,  ' ',  e2.Last_Name) AS Manager
                        FROM employee as e
                        JOIN role as r
                        ON e.role_id = r.id
                        JOIN department as d
                        ON d.id = r.department_id
                        LEFT JOIN employee as e2
                        ON e.manager_id = e2.id
                        WHERE d.name = '${byDepartment}'`, 
                        function(err, result) {
                                if (err) console.log(err);
                                console.log("\n\n\n\n")
                                console.table(result)
                                console.log("\n\n\n\n\n\n\n");});
        getUserInfo();
    
   }
   async function getAllEmployeesByManager(){
    const {byManager} = await inquirer.prompt([
        {
          type: "list",
          message: "Which employee do you want to see direct reports for?",
          name: "byManager",
          choices: [
            "Malis Brown", 
            "Tom Allen", 
            "Kevin Tupik",
            "Ashley Rodriguez"
            
        ]}
      ]);
    
    connection.query(`SELECT e.First_Name,
                            e.Last_Name,
                            r.title,
                            r.salary,
                            d.name as department,
                            concat(e2.First_Name,  ' ',  e2.Last_Name) AS Manager
                        FROM employee as e
                        JOIN role as r
                        ON e.role_id = r.id
                        JOIN department as d
                        ON d.id = r.department_id
                        LEFT JOIN employee as e2
                        ON e.manager_id = e2.id
                        WHERE concat(e2.First_Name,  ' ',  e2.Last_Name) = '${byManager}'`, 
                        function(err, result) {
                            if (err) console.log(err);
                            console.log("\n\n\n\n")
                            console.table(result)
                            console.log("\n\n\n\n\n\n\n");});
                            getUserInfo();
    }
    async function addEmployee(){
        const {firstName, lastName, role, manager} = await inquirer.prompt([
            {
                message: "What is the employee's first name?",
                name: "firstName"
            },
            {
                message: "WWhat is the employee's last name?",
                name: "lastName"
            },
            {
                message: "What is the employee's role?",
                name: "role"
            },
            {
                message: "Who is the employee's manager",
                name: "manager"
            }
        ])

      connection.query(`INSERT INTO Employee( First_Name, Last_Name, role_id, manager_id  )
        VALUES( '${firstName}', '${lastName}', ( SELECT id FROM role WHERE Title = '${role}' ), 
                ( select * from (select id from employee where concat( first_name, ' ', last_name ) = '${manager}') a )  )`, 
    function(err, result) {
        if (err) console.log(err);
        console.log("Welcome to our company");});
        getUserInfo();
    }

    async function removeEmployee(){
      const {name} = await inquirer.prompt([
          {
              message: "What is the employee's name?",
              name: "name"
          }     
      ])

    connection.query(` DELETE FROM Employee WHERE concat( First_Name,  ' ',  Last_Name) = '${name}' `, 
  function(err, result) {
      if (err) console.log(err);
      console.log("success");});
      getUserInfo();
  }

  async function updateEmployeeRole(){
    const {name, newRole} = await inquirer.prompt([
      {
        type: "list",
        message: "Which employee's role do you want to update?",
        name: "name",
        choices: [
          "John Doe",
          "Make Chen",
          "Ashley Rodriguez",
          "Kevin Tupik",
          "Kunal Singh",
          "Malis Brown", 
          "Sarah Lourd",
          "Tom Allen", 
          "Hugo Smith"
          
              
      ]},
      {
        type: "list",
        message: "Which role do you want to assign the selected employee?",
        name: "newRole",
        choices: [
          "Sales Lead", 
          "Salesperson", 
          "Lead Engineer",
          "Software Engineer",
          "Account Manager",
          "Accountant",
          "Legal Team Lead",
          "Lawyer",
          "HR"       
      ]},

    ]);

  connection.query(` UPDATE employee as e 
                      SET e.role_id = (SELECT id FROM role WHERE title = '${newRole}')
                      WHERE concat( e.First_Name,  ' ',  e.Last_Name) = '${name}'`, 
function(err, result) {
    if (err) console.log(err);
    console.log("success");});
    getUserInfo();
}

function viewAllRoles(){

  connection.query(`SELECT id,title,salary FROM role`, 
                  function(err, result) {
                          if (err) console.log(err);
                          console.log("\n\n\n\n")
                          console.table(result)
                          console.log("\n\n\n\n\n\n\n");;
                          
  });
  getUserInfo();
}
    

async function addRole(){
  const {nameRole, salary, department} = await inquirer.prompt([
    {
      message: "What is the name of role?",
      name: "nameRole"
    },
    {
      message: "What is the salary of the role?",
      name: "salary"
    },
    
    {
        type: "list",
        message: "Which department does the role belong to?",
        name: "department",
        choices: [
          "Sales", 
          "Engineering", 
          "Finance",
          "Legal",
          "HR"
  ]}
]);


connection.query(`INSERT INTO role(title , salary, department_id)
VALUES( '${nameRole}', '${salary}', ( SELECT id FROM department WHERE name = '${department}' ))`, 
                  function(err, result) {
                          if (err) console.log(err);
                          console.log("\n\n\n\n")
                          console.table(result)
                          console.log("\n\n\n\n\n\n\n");});
  getUserInfo();

}
function viewAllDepartments(){

  connection.query(`SELECT * FROM department`, 
                  function(err, result) {
                          if (err) console.log(err);
                          console.log("\n\n\n\n")
                          console.table(result)
                          console.log("\n\n\n\n\n\n\n");;
                          
  });
  getUserInfo();
}


async function addDepartment(){
  const {nameDepartment} = await inquirer.prompt([
    {
      message: "What is the name of the department?",
      name: "nameDepartment"
    }
]);

connection.query(`INSERT INTO department(name)
VALUES( '${nameDepartment}')`, 
                  function(err, result) {
                          if (err) console.log(err);
                          console.log("\n\n\n\n")
                          console.table(result)
                          console.log("\n\n\n\n\n\n\n");});
  getUserInfo();

  } 
  function quit(){
    console.log("Good bye!");
  }
 }
 