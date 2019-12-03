# Bamazon

## Project Functionality

This is a full-stack Node.js app that allows a user to select an item to purchase from an e-commerce website. After adding the item to the cart, the user selects the appropriate quantity. The app then checks the stock quantity in the database and informs the user if the purchase can be fulfilled or not.

## Project Challenges

The main challenges of this project, and the solutions used, were as follows:

1. response routing: the server is designed to handle both GET requests and PUT requests using the Express.js framework.
2. stock quantity validation: the app compares the stock quantity in the database (via a GET request) to the quantity requested by the user using logic on the front end.
3. stock quantity update: if there is sufficient stock to fulfill the order, the app updates the stock quantity in the database using a PUT request and Sequelize

## Project Usefulness

There are 5 main areas of note:

1. It uses MySQL and Sequelize to create a table in the database and to update the stock quantity when a purchase is made
2. It uses Express.js, the most widely used Node.js server framework, to build a server on the back end
3. It uses the Path package to get the correct file path for HTML requests.
4. It uses the jQuery library including click events and DOM manipulation
5. Heroku is configured for deployment of the application

## How to get started

On page load, the user selects an item to be placed in their cart. Only 1 item can be placed in the cart at a time, but the app will recognize the most recently selected item. The user then selects a quantity of the item and the app will tell them if the order can be fulfilled. If it can, the total cost of the order is shown. Either way, the app will allow the user to continue shopping.

## How to get help

[Express.js](https://expressjs.com/)
[jQuery Official Website](https://jquery.com/)
[Sequelize Queries](http://docs.sequelizejs.com/en/latest/docs/querying/)

## Project maintenance and contributions

This is not an original app. Instead, this project was prepared as part of my course work at Georgia Tech's Full Stack Coding Boot Camp (Oct 2019 to Jan 2020).

## Deployed link

https://infinite-falls-73524.herokuapp.com/
