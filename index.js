const env = require("dotenv").config();
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const conTable = require(`console.table`)



const PORT = process.env.PORT || 3001;
const exp = express();

const db = mysql.createConnection(
    {
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE
    },
    console.log(`Connected to the company_db database.`)
  );


  exp.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

const registry = () => {
  inquirer.createPromptModule([
    {
      Type: `list`,
      name: `selections`,
      message: `Please select an option from the list below to continue`,
      choices: [
        "All Departments",
        "All Team Roles",
        "All Employees",
        "Add Department",
        "Add Team Role",
        "Add Employee",
        "Exit"
      ]
    }
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
    }else {
      console.log("Thank You, have a nice day!")
    }}
))};
registry()