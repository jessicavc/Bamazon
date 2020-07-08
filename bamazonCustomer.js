var mysql = require("mysql");
var inquirer = require("inquirer");
var hide = require("hide-secrets");
var Table = require("cli-table");
var chalk = require ("chalk");


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
connection.connect(function (err) {
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
var resetCart = function () {
  chosenItem = {};
}

// function to display all items for sale
var displayItems = function () {
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
              console.log("Uh-oh! Please enter a number from 1-20");
              return false;
          }
      }
  // select all rows where ID equals user input
  }).then((answer) => {
      connection.query('SELECT item_id, product_name, price, stock_quantity FROM products WHERE ?', { item_id: answer.itemID }, (err, res) => {
          // confirm with user that this is the product they'd like to purchase
          confirmItem(res[0].product_name, res);
      });
  });
};

// function to confirm with user that the product they chose is correct
var confirmItem = function(product, object) {
  inquirer.prompt({
      name: 'confirmItem',
      type: 'confirm',
      message: `You chose` + chalk.blue.bold(` '${product}'. `) + `Is this correct?`
  }).then((answer) => {
      if (answer.confirmItem) {
          chosenItem = {
              item_id: object[0].item_id,
              product_name: object[0].product_name,
              price: object[0].price,
              stock_quantity: object[0].stock_quantity,
              product_sales: object[0].product_sales
          };
          // ask how many they'd like to purchase
          askHowMany(chosenItem.item_id);
      } else {
          askForID();
      }
  });
};

// function to ask user how many of the products they'd like to purchase
var askHowMany = function(chosenID) {
  inquirer.prompt({
      name: 'howMany',
      type: 'input',
      message: 'How many would you like to purchase?',
      validate: (value) => {
          if (!isNaN(value) && value >= 0) {
              return true;
          } else {
              console.log(chalk.red(' => Please enter a number greater than 0'));
              return false;
          }
      }
  }).then((answer) => {
      connection.query('SELECT stock_quantity FROM products WHERE ?', { item_id: chosenItem.item_id }, (err, res) => {
          // if there are not enough products in stock
          if (res[0].stock_quantity < answer.howMany) {
              console.log(chalk.blue.bold('\n\tSorry, insufficient quantity in stock!\n'));
              // confirm if user would still like to buy this product
              inquirer.prompt({
                  name: 'proceed',
                  type: 'confirm',
                  message: 'Would you still like to purchase this product?'
              }).then((answer) => {
                  if (answer.proceed) {
                      askHowMany(chosenItem.item_id);
                  } else {
                      console.log(chalk.blue.bold('\n\t Thank you for shopping with us! \n'));
                      connection.end();
                  }
              });
          // if there are enough products in stock for purchase to go through
          } else {
              chosenItem.howMany = answer.howMany;
              console.log(chalk.blue.bold('\n\tOrder processing...'));
              // console.log(chosenItem);

              // update database to reflect new stock quantity after sale
              connection.query('UPDATE products SET ? WHERE ?', [
                  {
                      stock_quantity: chosenItem.stock_quantity - answer.howMany,
                      product_sales: chosenItem.product_sales + (chosenItem.price * answer.howMany)
                  },
                  {
                      item_id: chosenItem.item_id
                  }
              ], (err, res) => {
                  console.log(chalk.blue.bold(`\n\tOrder confirmed!Your total is $${(chosenItem.price * chosenItem.howMany).toFixed(2)}.\n`));
                  // ask if user would like to make another purchase
                  promptNewPurchase();
              });
          }
      });
  });
}

// function to ask if user would like to make another purchase
var promptNewPurchase = function() {
  inquirer.prompt({
      name: 'newPurchase',
      type: 'confirm',
      message: 'Would you like to make another purchase?'
  }).then((answer) => {
      if (answer.newPurchase) {
          resetCart();
          askForID();
      } else {
          console.log(chalk.blue.bold('\n\tThank you for shopping with us. Have a great day!\n'));
          connection.end();
      }
  });
};