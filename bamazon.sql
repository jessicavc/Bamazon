CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT, 
  item_name VARCHAR(150) NOT NULL, # unique id for each product
  product_name VARCHAR(150) NOT NULL, # name of product
  department_name VARCHAR(150) NOT NULL, 
  price INT default 0, # cost to customer
  stock_quantity INT default 0, # how much of the product is available in stores
  PRIMARY KEY (id)
);

