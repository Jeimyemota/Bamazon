var mysql = require('mysql');
var prompt = require('prompt');
//pretty table
var Table = require('cli-table');
//pretty colors
var colors = require('colors/safe.js');

//--------------------------------------------------------------

var connection = mysql.createConnection({
	host: 'localhost',
	//Your Username
    user: 'root',
	//Your Password
    password: 'Jmota05!',
	database: 'bamazon', 
});

var productBought = [];

connection.connect();


//connecting to the mysql database and displaying pulled info to user
connection.query('SELECT ItemID, ProductName, Price FROM STOCK', function(err, result){
	if(err) console.log(err);

	//table for the info from the mysql database
	var table = new Table({
		head: ['Item Id#', 'Product Name', 'Price'],
		style: {
			head: ['cyan'],
			compact: false,
			colAligns: ['center'],
		}
	});

	//loops through each item in database and pushes that info into new row
	for(var i = 0; i < result.length; i++){
		table.push(
			[result[i].ItemID, result[i].ProductName, result[i].Price]
		);
	}
	console.log(table.toString());

	purchase();
});

//the purchase function so user can purchase items listed above
var purchase = function(){

	//creates the questions that will be prompted to the user
	var productInfo = {
		properties: {
			itemID:{description: colors.white.underline('Please enter the ID # of the item you wish to buy!')},
			Quantity:{description: colors.white.underline('How many items would you like to buy?')}
		},
	};
    
//______________________________________________________________________
    
    
	prompt.start();

	//gets the response
    prompt.get(productInfo, function(err, res){

		//places these responses in the variable
		var custBuy = {
			itemID: res.itemID,
			Quantity: res.Quantity
		};
		
		// pushed to the productBought array top of the page
		productBought.push(custBuy);

		//connects to the mysql database and selects the item the user selected above based on the item id number entered
		connection.query('SELECT * FROM STOCK WHERE ItemID=?', productBought[0].itemID, function(err, res){
				if(err) console.log(err, 'That item ID doesn\'t exist');
				
				//if quantity is less than amount wanted then alert out of stock.
				if(res[0].StockQuantity < productBought[0].Quantity){
					console.log(colors.white('That product is out of stock..'));
					connection.end();

				//if amount is more or equal to then continue and user is alerted of what items are bought, how much item is, and total amount. 
				} else if(res[0].StockQuantity >= productBought[0].Quantity){

					console.log('');

					console.log(colors.bgWhite(productBought[0].Quantity + ' items purchased'));

					console.log(colors.bgWhite(res[0].ProductName + ' ' + res[0].Price));

					//var totalSale displays total of bought items. 
					var totalSale = colors.bgWhite(res[0].Price * productBought[0].Quantity);

					//connect to database Departments and update totalSale for id of item. 
					connection.query("UPDATE Departments SET TotalSales = ? WHERE DepartmentName = ?;", [totalSale, res[0].DepartmentName], function(err, resultOne){
						if(err) console.log('error: ' + err);
						return resultOne;
					})

					console.log('Total: ' + totalSale);

					//this variable contains the newly updated stock quantity of the item purchased
					newQuantity = res[0].StockQuantity - productBought[0].Quantity;
			
					// Updating products bought
					connection.query("UPDATE STOCK SET StockQuantity = " + newQuantity +" WHERE ItemID = " + productBought[0].itemID, function(err, res){
						// if(err) throw err;
						// console.log('Problem ', err);
						console.log('');
						console.log(colors.cyan('Your order has been processed.  Thank you for shopping with us..'));
						console.log('');

						connection.end();
					})

				};

		})
	})

};