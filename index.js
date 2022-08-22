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
    console.log(`Connected to the team_db database.`)
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
    
  }))
}