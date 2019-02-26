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
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product",
          "Quit"
        ]
      }
    ])
    .then(function(answers) {
      switch (answers.menu) {
        case "View Products for Sale":
          viewProducts();
          break;
        case "View Low Inventory":
          viewLowInventory();
          break;
        case "Add to Inventory":
          addInventory();
          break;
        case "Add New Product":
          addProduct();
          break;
        case "Quit":
          connection.end();
          break;
      }
    });
}

function viewProducts() {
  connection.query(
    "select item_id, product_name, price, stock_quantity from products",
    function(err, res) {
      if (err) throw err;
      outputTable(res);
      switchboard();
    }
  );
}

function viewLowInventory() {
  connection.query(
    "select item_id, product_name, price, stock_quantity from products where stock_quantity < 5",
    function(err, res) {
      if (err) throw err;
      if (res.length > 0) {
        outputTable(res);
      } else {
        console.log("All items have at least a stock quantity of 5!");
      }
      switchboard();
    }
  );
}

function outputTable(response) {
  var output = table(
    response.map(function(rec) {
      return [
        rec.item_id,
        rec.product_name,
        "$" + parseFloat(rec.price).toFixed(2),
        rec.stock_quantity
      ];
    }),
    {
      columns: {
        0: { alignment: "right" },
        2: { alignment: "right" },
        3: { alignment: "right" }
      }
    }
  );
  console.log(output);
}

function addInventory() {
  connection.query(
    "select item_id, product_name, stock_quantity from products",
    function(err, selectRes) {
      if (err) throw err;
      inquirer
        .prompt([
          {
            name: "item_id",
            message: "Select a product to add more inventory:",
            type: "list",
            choices: selectRes.map(function(record) {
              return { name: record.product_name, value: record.item_id };
            })
          }
        ])
        .then(function(itemAnswers) {
          inquirer
            .prompt([
              {
                name: "add_quantity",
                message: "How many more of this item would you like to add?"
              }
            ])
            .then(function(qtyAnswers) {
              connection.query(
                "update products set stock_quantity = stock_quantity + ? where item_id = ?",
                [
                  parseInt(qtyAnswers.add_quantity),
                  parseInt(itemAnswers.item_id)
                ],
                function(err, updateRes) {
                  if (err) throw err;
                  connection.query(
                    "select stock_quantity from products where ?",
                    {
                      item_id: itemAnswers.item_id
                    },
                    function(err, postUpdateRes) {
                      if (err) throw err;
                      console.log(
                        "Now stocking " + postUpdateRes[0].stock_quantity
                      );
                      switchboard();
                    }
                  );
                }
              );
            });
        });
    }
  );
}

function addProduct() {
  inquirer
    .prompt([
      {
        name: "product_name",
        message: "Product name:"
      },
      {
        name: "department_name",
        message: "Department name:"
      },
      {
        name: "price",
        message: "Unit price:"
      },
      {
        name: "stock_quantity",
        message: "Units in stock:"
      }
    ])
    .then(function(answers) {
      connection.query(
        "insert into products (product_name, department_name, price, stock_quantity) values (?, ?, ?, ?)",
        [
          answers.product_name,
          answers.department_name,
          answers.price,
          answers.stock_quantity
        ],
        function(err, res) {
          if (err) throw err;
          console.log("Added product ID " + res.insertId);
          switchboard();
        }
      );
    });
}
