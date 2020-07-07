-- Drop bamazon_db in case it already exists
DROP DATABASE bamazon_db;
-- Create a MySQL Database called `bamazon`.
CREATE DATABASE bamazon_db;
USE bamazon_db;
-- create a Table inside of that database called `products`.
-- The products table should have each of the following columns:
-- item_id (unique id for each product)
-- product_name (Name of product)
-- department_name
-- price (cost to customer)
-- stock_quantity (how much of the product is available in stores)
CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  # unique id for each product
  product_name TEXT NOT NULL,
  # name of product
  department_name VARCHAR (150) NOT NULL,
  price DECIMAL (10,2) NULL,
  # cost to customer
  stock_quantity INT NULL,
  # how much of the product is available in stores
  PRIMARY KEY (item_id)
);
-- Populate this database with around 10 different products.

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hasbro GI Joe Action Figure", "Toys", 19.99, 25 ),
( "Hammock Inflatable Pool", "Toys", 24.99, 10),
( "Transformers Optimus Prime Action Figure", "Toys", 49.99, 5),
( "Echo Dot", "Electronics", 29.00, 55),
( "Fire Tablet", "Electronics", 49.99, 55),
( "Roku Media Player", "Electronics", 24.00, 5),
("Face Cover Mouth Mask", "Clothing", 12.95, 2),
("Biker Shorts", "Clothing", 19.99, 70),
("Water Sport Shoes", "Clothing", 17.99, 50),
("Crocs Classic Clog", "Clothing", 19.99, 50),
("Earth Rated Dog Poop Bags", "Pet Supplies", 5.99, 155),
("Dr Elsey’s Premier Clumping Cat Litter", "Pet Supplies", 39.00, 340),
("Seresto Flea and Tick Collar for Dogs", "Pet Supplies", 42.98, 234),
("Sparkling Ice Black Cherry Sparkling Water", "Grocery", 34.99, 297),
( "Nabisco Variety Pack", "Grocery", 6.32, 879),
("bubly Sparkling Water Variety Pack", "Grocery", 23.99, 134),
("Face Mask case of 500", "Hygiene", 29.94, 1),
("Mrs Meyers Cruelty Free Hand Soap", "Hygiene", 7.29, 793),
("Dove Body Wash", "Hygiene", 18.99, 807);

