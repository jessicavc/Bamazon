var mysql = require("mysql");
var inquirer = require("inquirer");
var hide = require("hide-secrets");
var Table = require("cli-table");


// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Adriana01!3",
  database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  //welcome message
  console.log("Welcome to Bamazon!"); 
  //start the app
  displayItems();
});

// GLOBAL VARIABLES
// =====================================================================================
var chosenItem = {};

// FUNCTIONS
// =====================================================================================
// function to reset the chosenItem array so that previous purchases are not inside
var resetCart = function() {
    chosenItem = {};
}

// function to display all items for sale
var displayItems = function() {
    connection.query(`SELECT * FROM products`, (err, res) => {
        var listTable = new Table({
            head: ['Item ID', 'Product Name', 'Price'],
            colWidths: [10, 45, 12]
        });

        for (var i = 0; i < res.length; i++) {
            listTable.push([res[i].item_id, res[i].product_name, `${res[i].price}`]);
            
        }
        
        console.log(`\n\n${listTable.toString()}\n\n`);
        // ask user to enter ID of item they wish to purchase
        askForID();
    });
};

// function to prompt user to enter ID of the product to purchase
var askForID = function() {
    inquirer.prompt({
        name: 'itemID',
        type: 'input',
        message: 'Enter the ID of the item you would like to purchase:',
        // validate input 
        validate: (value) => {
            if (!isNaN(value) && (value > 0 && value <= 20)) {
                return true;
            } else {
                console.log("Please enter a number from 1-20");
                return false;
            }
        }
    // select all rows where ID equals user input
    }).then((answer) => {
        connection.query('SELECT item_id, product_name, price, stock_quantity, product_sales FROM products WHERE ?', { item_id: answer.itemID }, (err, res) => {
            // confirm with user that this is the product they'd like to purchase
            confirmItem(res[0].product_name, res);
        });
    });
};