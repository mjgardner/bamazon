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
  connection.query(
    "select item_id, product_name, price from products where stock_quantity > 0",
    function(err, res) {
      if (err) throw err;
      var output = table(
        res.map(function(rec) {
          return [
            rec.item_id,
            rec.product_name,
            "$" + parseFloat(rec.price).toFixed(2)
          ];
        }),
        {
          columns: {
            0: { alignment: "right" },
            2: { alignment: "right" }
          }
        }
      );
      console.log(output);
      inquirer
        .prompt([
          {
            name: "itemId",
            message: "Please enter a product ID you would like to buy:",
            validate: function(input) {
              if (
                res
                  .map(function(rec) {
                    return parseInt(rec.item_id);
                  })
                  .indexOf(parseInt(input)) > -1
              ) {
                return true;
              } else {
                return "I don't have that product!";
              }
            }
          }
        ])
        .then(function(answers) {
          connection.query(
            "select item_id, stock_quantity, price from products where ?",
            {
              item_id: answers.itemId
            },
            function(err, itemRes) {
              if (err) throw err;
              promptHowMany(
                parseInt(answers.itemId),
                parseInt(itemRes[0].stock_quantity),
                parseFloat(itemRes[0].price)
              );
            }
          );
        });
    }
  );
});

function promptHowMany(itemId, stockQuantity, price) {
  inquirer
    .prompt([
      {
        name: "quantity",
        message: "How many?",
        validate: function(input) {
          if (parseInt(input) > stockQuantity) {
            return "Insufficient quantity!";
          } else {
            return true;
          }
        }
      }
    ])
    .then(function(answers) {
      connection.query(
        "update products set stock_quantity = stock_quantity - ?, product_sales = product_sales + (price * ?) where item_id = ?",
        [
          parseInt(answers.quantity),
          parseInt(answers.quantity),
          itemId
        ],
        function(err, updateRes) {
          if (err) throw err;
          if (updateRes.affectedRows === 1) {
            console.log(
              "Thank you for your purchase of $" +
                (parseInt(answers.quantity) * price).toFixed(2)
            );
          }
          connection.end();
        }
      );
    });
}
