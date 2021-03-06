// HTML routes for client side navigation

// Dependencies

var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

    // app.get("/signup", function(req, res) {
    //     // If the user already has an account send them to the members page
    //     if (req.user) {
    //         res.redirect("/admin");
    //     }
    //     res.sendFile(path.join(__dirname, "../public/signup.html"));
    // });

    app.get("/login", function(req, res) {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/admin");
        }
        res.sendFile(path.join(__dirname, "../public/login.html"));
    });

    // Here we've add our isAuthenticated middleware to this route.
    // If a user who is not logged in tries to access this route they will be redirected to the signup page
    app.get("/admin", isAuthenticated, function(req, res) {
        res.sendFile(path.join(__dirname, "../public/admin.html"));
    });

    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });

    app.get("/bio", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/bio.html"));
    });

};
