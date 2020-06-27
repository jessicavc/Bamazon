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
  id INT NOT NULL AUTO_INCREMENT,
  item_id VARCHAR (150) NOT NULL,
  # unique id for each product
  product_name VARCHAR (150) NOT NULL,
  # name of product
  department_name VARCHAR (150) NOT NULL,
  price INT default 0,
  # cost to customer
  stock_quantity INT default 0,
  # how much of the product is available in stores
  PRIMARY KEY (id)
);
-- Populate this database with around 10 different products.

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("HB123", "Hasbro GI Joe Action Figure", "Toys", 19.99, 25 ),
( "H829", "Hammock Inflatable Pool", "Toys", 24.99, 10),
( "TR001", "Transformers Optimus Prime Action Figure", "Toys", 49.99, 5),
( "ED002", "Echo Dot", "Electronics", 29.00, 55),
( "FT001","Fire Tablet", "Electronics", 49.99, 55),
("R123", "Roku Media Player", "Electronics", 24.00, 5),
("FM911", "Face Cover Mouth Mask", "Clothing", 12.95, 2),
("BS209", "Biker Shorts", "Clothing", 19.99, 70),
("WS002","Water Sport Shoes", "Clothing", 17.99, 50),
("CC68", "Crocs Classic Clog", "Clothing", 19.99, 50),
("POO009", "Earth Rated Dog Poop Bags", "Pet Supplies", 5.99, 155),
("CPOO123","Dr Elsey’s Premier Clumping Cat Litter", "Pet Supplies", 39.00, 340),
("DFT111", "Seresto Flea and Tick Collar for Dogs", "Pet Supplies", 42.98, 234),
("H20XZ", "Sparkling Ice Black Cherry Sparkling Water", "Grocery", 34.99, 297),
("0R30", "Nabisco Variety Pack", "Grocery", 6.32, 879),
("BW123", "bubly Sparkling Water Variety Pack", "Grocery", 23.99, 134),
("FM9112", "Face Mask case of 500", "Hygiene", 29.94, 1),
("MMS255", "Mrs Meyers Cruelty Free Hand Soap", "Hygiene", 7.29, 793),
("DBW123", "Dove Body Wash", "Hygiene", 18.99, 807);