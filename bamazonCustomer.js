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
    "select item_id, product_name, price from products",
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
      inquirer.prompt([
        {
          name: "item_id",
          message: "Please enter a product ID you would like to buy:",
          validate: function(input) {
            return (
              res
                .map(function(rec) {
                  return parseInt(rec.item_id);
                })
                .indexOf(parseInt(input)) > -1
            );
          }
        }
      ]);
      connection.end();
    }
  );
});
