//requires our db to access our product model
const db = require("../models");

//exports a function that will accept the app we pass
module.exports = function(app) {
    app.get("/api/products", function(req, res) {

        //find all products, take the results and respond with a json of all these results
        db.Product.findAll({}).then(function(results) {
            res.json(results);
        });
    });

    app.put("/api/products", function(req, res) {
        db.Product.update(req.body, {
            where: {
                id: req.body.id
            }
        });

    });
};