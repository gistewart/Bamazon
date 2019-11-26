// Dependencies - series of npm packages that we will use to give our server useful functionality
require("dotenv").config();
const express = require("express");

//Sets up the Express App
const app = express();

//Establishes our PORT and creates the server
const PORT = process.env.PORT || 3000;

//Requiring our models for syncing
//uncomment
// const db = require("./models");

// Sets up the Express app to handle data parsing (configures our middleware)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

//Require our routes
//uncomment
// require("./routes/api-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
//uncomment twice
// db.sequelize.sync().then(function() {
app.listen(PORT, function() {
    console.log("Listening at http://localhost:" + PORT);
    // })
});