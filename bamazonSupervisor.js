require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");
const { table } = require("table");
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  switchboard();
});

function switchboard() {
  inquirer
    .prompt([
      {
        name: "menu",
        type: "list",
        message: "Menu:",
        choices: [
          "View Product Sales by Department",
          "Create New Department",
          "Quit"
        ]
      }
    ])
    .then(function(answers) {
      switch (answers.menu) {
        case "View Product Sales by Department":
          viewSalesByDept();
          break;
        case "Create New Department":
          createDept();
          break;
        case "Quit":
          connection.end();
          break;
      }
    });
}

function viewSalesByDept() {
  switchboard();
}

function createDept() {
  switchboard();
}
