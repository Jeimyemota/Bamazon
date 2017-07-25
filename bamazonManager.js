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

var UpdateStock = [];
var addedProduct = [];

//-------------------------------------------------------------------------


connection.connect();


//-------------------------------------------------------------------------

// * menu options: 1) View Products for Sale 2) View Low Stock 3) Add to Stock 4) Add New a Product

//creates the prompt that will be loaded when the app loads
var managerOptions = {
	properties:{
		mOptions:{
			description: colors.white('Key in one of the following options: 1) View Products for Sale 2) View Low Inventory 3) Add to Inventory 4) Add New Product')
		},
	},
};

//start the prompt
prompt.start();
//this prompts the above question and below it states what will be done 
prompt.get(managerOptions, function(err, res){
	if(res.mOptions == 1){
		viewProducts();
	} else if(res.mOptions == 2){
		viewInventory();
	} else if(res.mOptions == 3){
		addInventory();
	} else if(res.mOptions ==4){
		addNewProduct();
	} else {
		console.log(colors.cyan('Invalid Choice'));
		connection.end();
	}
});

//------------------------------------------------------------------------------

//this is the function for option 1 of the question above.
var viewProducts = function(){
	//connects to database called products and returns the info
	connection.query('SELECT * FROM STOCK', function(err, res){
		console.log('');
		console.log(colors.cyan('Products for Sale'));
		console.log('');	

		//this creates a table outline in the node app to organize the data
		var table = new Table({
			head: ['Item Id#', 'Product Name', 'Department Name', 'Price', 'Stock Quantity'],
			style: {
				head: ['blue'],
				compact: false,
				colAligns: ['center'],
			}
		});
        
        //info gets pushed to table
		for(var i=0; i<res.length; i++){
			table.push(
				[res[i].ItemID, res[i].ProductName, res[i].DepartmentName, res[i].Price, res[i].StockQuantity]
			);
		}

		//this console.logs the table and then ends connection
		console.log(table.toString());
		connection.end();
	})
};

//this creates the function for the second option from the prompt
var viewInventory = function(){

	//starts the connection and only returns items that have a stock quantity of less than 5
	connection.query('SELECT * FROM STOCK WHERE StockQuantity < 5', function(err, res){
		console.log('');
		console.log(colors.magenta('Items With Low Inventory'));
		console.log('');

		var table = new Table({
			head: ['Item Id#', 'Product Name', 'Department Name', 'Price', 'Stock Quantity'],
			style: {
				head: ['blue'],
				compact: false,
				colAligns: ['center'],
			}
		});

		//pushes it into the table to be logged on the console
		for(var i=0; i<res.length; i++){
			table.push(
				[res[i].ItemID, res[i].ProductName, res[i].DepartmentName, res[i].Price, res[i].StockQuantity]
			);
		}

		console.log(table.toString());
		connection.end();
	})
};

//creates the function for the third option of the prompt
var addInventory = function(){
	//adds var that will add to stock inv
	var addInvt = {
		properties:{
			inventoryID: {
				description: colors.green('What is the ID number of the product you want to add inventory to?')
			},
			inventoryAmount:{
				description: colors.green('How many items do you want to add to the stock room?')
			}
		},
	};
    
//-------------------------------------------------------------------------------
    
    
	prompt.start();

	//get the info entered 
	prompt.get(addInvt, function(err, res){

		//creates a variable for answers 
		var invtAdded = {
			inventoryAmount: res.inventoryAmount,
			inventoryID: res.inventoryID,
		}

		//pushes the responses to UpdateStock array created at the top of this page
		UpdateStock.push(invtAdded);

		//connect to database STOCK 
        //sets quanitity to number entered in the prompt above 
        //AND current stock quantity for certain iD
        
		connection.query("UPDATE STOCK SET StockQuantity = (StockQuantity + ?) WHERE ItemID = ?;", [UpdateStock[0].inventoryAmount, UpdateStock[0].inventoryID], function(err, result){

			if(err) console.log('error '+ err);

			// this selects  new updated info from database then console.log the updated amount
			connection.query("SELECT * FROM STOCK WHERE ItemID = ?", UpdateStock[0].inventoryID, function(error, resOne){
				console.log('');
				console.log('The new updated stock quantity for id# '+UpdateStock[0].inventoryID+ ' is ' + resOne[0].StockQuantity);
				console.log('');
				connection.end();
			})

		})
	})
};

//creates the function for the last option above
var addNewItem = function(){
	//creates the variable newItem which holds the questions that are asked
	var newItem = {
		properties: {
			newIdNum:{ description: colors.gray('Please enter a 5 digit item Id #')},
			newItemName:{ description: colors.gray('Please enter the name of the Item you want to add')},
			newItemDepartment: { description: colors.gray('What department does this item go to?')},
			newItemPrice: { description: colors.gray('Please enter the price of the item in the format of 00.00')},
			newStockQuantity: { description: colors.gray('Please enter a stock quantity for this item...')},
		}
	}

	prompt.start();

	//gets the responses for the prompt above
	prompt.get(newProduct, function(err, res){

		//creates a variable for the responses to be logged to
		var ItemNew = {
			newIdNum: res.newIdNum,
			newItemName: res. newItemName,
			newItemDepartment: res.newItemDepartment,
			newItemPrice: res.newItemPrice,
			newStockQuantity: res.newStockQuantity,

		};
        
//---------------------------------------------------------------------------
        
		//pushes the variable and the response to addedProduct array at the top of page
		addedProduct.push(newItem);

		//connects and inserts the prompt responses into the database to create the new item
		connection.query('INSERT INTO STOCK (ItemID, ProductName, DepartmentName, Price, StockQuantity) VALUES (?, ?, ?, ?, ?);', [addedProduct[0].newIdNum, addedProduct[0].newItemName, addedProduct[0].newItemDepartment, addedProduct[0].newItemPrice, addedProduct[0].newStockQuantity], function(err, result){

			if(err) console.log('Error: ' + err);

			console.log('Item successfully added to the inventory!');
			console.log(' ');
			console.log('Item id#: ' + addedProduct[0].newIdNum);
			console.log('Item name: ' + addedProduct[0].newItemName);
			console.log('Department: ' + addedProduct[0].newItemDepartment);
			console.log('Price: $' + addedProduct[0].newItemPrice);
			console.log('Stock Quantity: ' + addedProduct[0].newStockQuantity);

			connection.end();
		})
	})
};

