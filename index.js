const env = require("dotenv").config();
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const conTable = require('console.table');



const PORT = process.env.PORT || 3001;
const exp = express();

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
  );

const registry = () => {
  inquirer.prompt([
    {
      type: 'list',
      choices: ["All Departments", "All Team Roles", "All Employees", "Add Department", "Add Team Role", "Add Employee", "Update Employee", "Exit"],
      message: "Please select an option from the list below to continue",
      name: 'selections',
    }
    // {
    //   type: 'list',
    //   choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add a Role", "Add an Employee", "Update Employee Role", "Quit"],
    //   message: 'Please select one from the list below.',
    //   name: 'selections',
    // }
  ]).then((ans => {
      //Checks to see if all departments selected
    if(ans.selections === "All Departments") {
      db.query(`SELECT * FROM department`, (err,result) => {
        console.log(`Here is the department list`);
        console.table(result);
        registry()
      });
      //Checks to see if team roles selected
    }else if (ans.selections === "All Team Roles") {
      db.query(`SELECT * FROM role`, (err,result) => {
        console.log(`Here are the Team Roles`);
        console.table(result);
        registry()
      });
      //Checks to see if All Employees is selected
    }else if (ans.selections === "All Employees") {
      db.query(`SELECT * FROM employee`, (err,result) => {
        console.log(`Here are the companies employees`);
        console.table(result);
        registry()
      });
      //Checks to see if Add Department is selected
    }else if (ans.selections === "Add Department") {
      genDepart()
      //Checks to see if Add Team Role is selected
    }else if (ans.selections === "Add Team Role") {
      genRole()
      //Checks to see if Add Employee is selected
    }else if (ans.selections === "Add Employee") {
      genEmployee()
      //Checks to see if Exit is selected
    }else if (ans.selections === "Update Employee") {
      updateEmployee()
      //Checks to see if Exit is selected
    }else {
      console.log("Thank You, have a nice day!");
    }}
))};
registry()

const genDepart = () =>{
  inquirer.prompt([
    {
      type: 'input',
      name: 'department',
      message: "New department name?"
    }
  ]).then((ans => {
    db.query('INSERT INTO department(name) VALUES (?)', [ans.department], (err,result) => {
      console.log(`${ans.department} has been added to the database.`)
      registry()
    })
  }))
};

const genRole = () =>{
  inquirer.prompt([
    {
      type: 'input',
      name: 'newRole',
      message: "New Role in Company?",
  },
  {
      type: 'number',
      name: 'salary',
      message: "Role Salary?",
  },
  {
      type: 'list',
      name: 'department',
      message: "Role belongs to what Department?",
      choices: 'SELECT department.name AS name, department.id AS value FROM department',
  },
  ]).then((ans => {
    db.query('INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?)',
    [
      ans.newRole,
      ans.salary,
      ans.department,
    ], (err,result) => {
      console.log(`${ans.newRole} has been added to ${ans.department} in the database.`)
      registry()
    })
  }))
};

const genEmployee = () =>{
  inquirer.prompt([
    {
      type: 'input',
      name: 'first',
      message: "Employee's first name?",
  },
  {
      type: 'input',
      name: 'last',
      message: "Employee's last name?",
  },
  {
      type: 'input',
      name: 'role',
      message: "Employee Role? Please enter role ID",
  },
  {
      type: 'input',
      name: 'manager',
      message: "Manager ID?"
  }
  ]).then((ans => {
    db.query('INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
    [
      ans.first,
      ans.last,
      ans.role,
      ans.manager
    ], (err,result) => {
      console.log(`${ans.first} ${ans.last} has been added to the database.`)
      registry()
    })
  }))
};

const updateEmployee = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'employee',
      message: "Which Employee to Update?",
      choices: 'SELECT employee.first_name AS name, employee.id AS value FROM employee'
  },
  {
      type: 'list',
      name: 'role',
      message: "New Role?",
      choices: 'SELECT role.title AS name, role.id AS value FROM role'
  },
  ]).then((ans => {
    db.query(`UPDATE employee SET role_id = ${ans.role} WHERE name = ${ans.employee}`), (err,result) => {
      console.log(`${ans.first} ${ans.last} has been added to the database.`)
      registry()
    }
  }))
}