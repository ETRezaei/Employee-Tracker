const inquirer = require("inquirer");
const mysql = require("mysql");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "emidayo777",
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
        "Update Employee Manager",
        "View All Roles",
        "Add Role",
        "Remove Role",
        "View All Departments",
        "Add Department",
        "Remove Department",
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
                                console.table(result);
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
                                console.table(result);});
    
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
                            console.table(result);});
 
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
       
    }
    

 }
 