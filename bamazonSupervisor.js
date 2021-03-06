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
  connection.query(
    "select d.department_id, d.department_name, d.over_head_costs, sum(p.product_sales) as product_sales, sum(p.product_sales) - d.over_head_costs as total_profit from bamazon.departments d left join bamazon.products p on p.department_id = d.department_id group by d.department_id",
    function(err, res) {
      if (err) throw err;
      var resTable = res.map(function(rec) {
        return [
          rec.department_id,
          rec.department_name,
          "$" + parseFloat(rec.over_head_costs).toFixed(2),
          rec.product_sales
            ? "$" + parseFloat(rec.product_sales).toFixed(2)
            : "$0.00",
          rec.total_profit
            ? "$" + parseFloat(rec.total_profit).toFixed(2)
            : "$-" + parseFloat(rec.over_head_costs).toFixed(2)
        ];
      });
      resTable.unshift([
        "Department ID",
        "Department Name",
        "Overhead Costs",
        "Product Sales",
        "Total Profit"
      ]);
      var output = table(resTable, {
        columns: {
          0: { alignment: "right" },
          2: { alignment: "right" },
          3: { alignment: "right" },
          4: { alignment: "right" }
        },
        drawHorizontalLine: function(index, size) {
          return index === 0 || index === 1 || index === size;
        }
      });
      console.log(output);
      switchboard();
    }
  );
}

function createDept() {
  inquirer
    .prompt([
      {
        name: "department_name",
        message: "Enter new department name:"
      },
      {
        name: "over_head_costs",
        message: "Enter overhead costs for this department:"
      }
    ])
    .then(function(answers) {
      connection.query(
        "insert into departments (department_name, over_head_costs) values (?, ?)",
        [answers.department_name, answers.over_head_costs],
        function(err, res) {
          if (err) throw err;
          console.log(
            "Added " + res.affectedRows + " department as ID " + res.insertId
          );
          switchboard();
        }
      );
    });
}
