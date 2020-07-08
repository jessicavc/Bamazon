# Welcome to Bamazon

1. Uses a MySQL Database called `bamazon_db`.

2. `bamazon_db` contains a table inside of it called `products`.

3. The products table has each of the following columns:

   * item_id (unique id for each product)

   * product_name (Name of product)

   * department_name

   * price (cost to customer)

   * stock_quantity (how much of the product is available in stores)

4. The database has about 19 different items. 

5. Start bamazon's CLI `bamazonCustomer.js`. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

6. The app should then prompt users with two messages.

   * The first should ask them the ID of the product they would like to buy.
        - The user will then be prompted to confirm that they've selected the desired item (Y/N).
   * The second message will ask how many units of the product they would like to buy.
    

7. Once the customer has placed the order, the application will check if the store has enough of the product to meet the customer's request.

   * If not, the app will log `Sorry, Insufficient inventory`, and then a message will appear asking if customer would like to proceed with their order (Y/N). If customer selects 'NO', the connection will end. If the customer selects 'YES', the prompt cycle will start over.

8. However, if the store _DOES_ have enough of the product, the customer's order will be fulfilled and will display the total of the purchase. 

## Happy Shopping 
   
