DROP DATABASE IF EXISTS Bamazon;
CREATE DATABASE Bamazon;

USE bamazon;

CREATE TABLE STOCK (
ItemID int NOT NULL,
ProductName varchar(50) NOT NULL,
DepartmentName varchar(50) NOT NULL,
Price DECIMAL(4,2) NOT NULL,
StockQuantity int NOT NULL);

INSERT INTO STOCK (ItemID, ProductName, DepartmentName, Price, StockQuantity) VALUES (
12345,
'Overwatch: Collectors Edition',
'Video Games',
89.99,
5);

INSERT INTO STOCK (ItemID, ProductName, DepartmentName, Price, StockQuantity) VALUES (
67891,
'Azeroth Map',
'Collectibles',
29.99,
25);

INSERT INTO STOCK (ItemID, ProductName, DepartmentName, Price, StockQuantity) VALUES (
23456,
'Docile Murlock',
'Mystical Pets',
80.99,
10);

INSERT INTO STOCK (ItemID, ProductName, DepartmentName, Price, StockQuantity) VALUES (
78912,
'Magic the Gathering: Dark and Light Decks',
'Playing Cards',
19.99,
8);

INSERT INTO STOCK (ItemID, ProductName, DepartmentName, Price, StockQuantity) VALUES (
34567,
'One Shot One Kill T-shirt Medium',
'Womens Clothing',
49.99,
30);

INSERT INTO STOCK (ItemID, ProductName, DepartmentName, Price, StockQuantity) VALUES (
89123,
'Winky Face T-shirt Medium',
'Womens Clothing',
25.99,
8);

INSERT INTO STOCK (ItemID, ProductName, DepartmentName, Price, StockQuantity) VALUES (
45678,
'Im not a young man anymore Beanie- Blue',
'Mens Clothing',
21.99,
15);

INSERT INTO STOCK (ItemID, ProductName, DepartmentName, Price, StockQuantity) VALUES (
91234,
'Andu-Falah dor! Mug',
'Home',
49.99,
10);

INSERT INTO STOCK (ItemID, ProductName, DepartmentName, Price, StockQuantity) VALUES (
56789,
'Miniture Docile Deathwing Clone',
'Mystical Pets',
25.99,
10);

INSERT INTO STOCK (ItemID, ProductName, DepartmentName, Price, StockQuantity) VALUES (
11234,
'World Of Warcraft: Started Edition',
'Video Games',
29.99,
5);


-- This creates department table...

USE bamazon;
CREATE TABLE Departments(
DepartmentId int AUTO_INCREMENT,
PRIMARY KEY(DepartmentId),
DepartmentName varchar(50) NOT NULL,
OverHeadCosts DECIMAL(11,2) NOT NULL,
TotalSales DECIMAL(11,2) NOT NULL);


INSERT INTO Departments (DepartmentName, OverHeadCosts, TotalSales) VALUES (
'Mens Clothing',
10000,
0);

INSERT INTO Departments (DepartmentName, OverHeadCosts, TotalSales) VALUES (
'Mystical Pets',
10000,
00.00);

INSERT INTO Departments (DepartmentName, OverHeadCosts, TotalSales) VALUES (
'Home',
20000,
0);

INSERT INTO Departments (DepartmentName, OverHeadCosts, TotalSales) VALUES (
'Playing Cards',
15000,
0);

INSERT INTO Departments (DepartmentName, OverHeadCosts, TotalSales) VALUES (
'Video Games',
50000,
0);

INSERT INTO Departments (DepartmentName, OverHeadCosts, TotalSales) VALUES (
'Womens Clothing',
25000,
0);
INSERT INTO Departments (DepartmentName, OverHeadCosts, TotalSales) VALUES (
'Collectibles',
25000,
0);


